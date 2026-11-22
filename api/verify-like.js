import { GoogleGenAI, Type, ThinkingLevel } from '@google/genai';

function parseDataUrl(dataUrl) {
  if (typeof dataUrl !== 'string') return null;
  const match = dataUrl.trim().match(/^data:(image\/(?:jpeg|jpg|png|webp|gif));base64,([A-Za-z0-9+/=\s]+)$/i);
  if (!match) return null;
  let mimeType = match[1].toLowerCase();
  if (mimeType === 'image/jpg') mimeType = 'image/jpeg';
  const base64Data = match[2].replace(/\s+/g, '');
  if (!base64Data || base64Data.length > 10 * 1024 * 1024) {
    return null;
  }
  return { mimeType, base64Data };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const rawKey = process.env.GEMINI_API_KEY || '';
  const apiKey = String(rawKey).trim().replace(/^["']|["']$/g, '');
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey === 'YOUR_API_KEY') {
    return res.status(503).json({
      success: false,
      nonRetryable: true,
      code: 'API_KEY_MISSING',
      message: 'সার্ভারে বৈধ GEMINI_API_KEY সেট করা নেই (Vercel Environment Variables বা Settings > Secrets চেক করুন)।',
      messageEn: 'Valid GEMINI_API_KEY is not configured on the server.'
    });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  if (!body || typeof body !== 'object') body = {};
  const parsedImage = parseDataUrl(body.image);
  if (!parsedImage) {
    return res.status(400).json({
      success: false,
      nonRetryable: true,
      isLiked: false,
      reasonBn: 'সঠিক ফরম্যাটের স্ক্রিনশট পাওয়া যায়নি',
      reasonEn: 'Invalid screenshot image format',
      message: 'সঠিক ফরম্যাটের স্ক্রিনশট পাওয়া যায়নি',
      messageEn: 'Invalid screenshot image format'
    });
  }

  const expectedPlatform = String(body.platform || 'Social Media').trim();
  const platformLower = expectedPlatform.toLowerCase();
  const isYouTubeTask = platformLower.includes('youtube') || platformLower.includes('shorts');
  const isTikTokTask = platformLower.includes('tiktok');
  const isFacebookTask = platformLower.includes('facebook') || platformLower.includes('fb');

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });

  let platformRules = '';
  if (isYouTubeTask) {
    platformRules = `YOUTUBE / YOUTUBE SHORTS VERIFICATION RULES (READ CAREFULLY):
- First confirm the screenshot shows a real YouTube or YouTube Shorts video screen (e.g., YouTube logo, youtube.com / m.youtube.com URL bar, Shorts right-side action bar with Like/Comment/Share & Subscribe button, or YouTube watch page).
- CRITICAL — BLACK / DARK / LOADING VIDEO FRAMES ARE 100% VALID:
  - A pitch-black, dark, dim, paused, buffering, or loading video frame behind the YouTube UI is completely normal and MUST BE ACCEPTED as long as the YouTube UI and an active Like icon are visible.
  - NEVER return isLiked = false just because the video background is black or dark!
- YouTube uses TWO valid Like icon styles depending on App vs Mobile Web (m.youtube.com/shorts) vs Desktop:
  1) HEART icon (commonly shown on m.youtube.com/shorts mobile web & newer YouTube Shorts right action bar above the like count and Comment icon):
     - LIKED (isLiked = true): A SOLID FILLED WHITE heart (completely opaque solid white interior, NOT hollow), or a solid filled red/pink/blue heart.
     - NOT LIKED (isLiked = false): A HOLLOW / OUTLINED heart (thin border stroke only, with empty/transparent center showing the video behind it).
  2) THUMBS-UP icon (shown on YouTube App Shorts right action bar or below standard YouTube videos):
     - LIKED (isLiked = true): A SOLID FILLED thumbs-up — solid WHITE on dark mode / Shorts overlay, OR solid BLUE, OR solid BLACK/DARK on light mode (completely filled interior).
     - NOT LIKED (isLiked = false): A HOLLOW / OUTLINED thumbs-up (thin outline only with empty/transparent interior).
- CRITICAL: Unlike TikTok (where liked hearts turn red), on YouTube Shorts and YouTube Dark Mode the ACTIVE LIKED icon is SOLID WHITE! Do NOT mark isLiked = false just because the filled heart or thumbs-up is white.
- If the screenshot shows the YouTube / YouTube Shorts UI (even over a black/dark/loading video frame) and the Like icon (heart OR thumbs-up) is solidly filled (solid white, blue, dark, or red), return isLiked = true.
- Return isLiked = false ONLY if:
  - The Like icon is clearly a hollow unfilled outline (transparent center), OR
  - No Like icon is visible, OR
  - There is NO YouTube UI at all (e.g., an empty image with zero UI controls, random photo, selfie, chat screen, or home feed without an open video).
- Subscribe / Follow is optional — ONLY verify the Like icon state.`;
  } else if (isTikTokTask) {
    platformRules = `TIKTOK VERIFICATION RULES (READ CAREFULLY):
- Confirm the screenshot shows real TikTok video/reel player UI (e.g., right-side action bar with profile avatar / heart / comment / bookmark / share icons, top "Following / For You" tabs, video caption/username, or bottom TikTok navigation bar).
- CRITICAL — BLACK / DARK / LOADING VIDEO FRAMES ARE 100% VALID:
  - Many TikTok videos have a completely black, dark, fading, paused, or still-loading video background while the TikTok UI overlay (tabs, right-side icons, caption, bottom bar) is clearly visible.
  - A black or dark video frame is 100% VALID and MUST PASS if the TikTok UI is visible and the Like heart is red/pink!
  - NEVER reject a screenshot just because the video area is black, dark, or blank! Only reject an empty image with ZERO TikTok UI controls.
- Check ONLY the Like heart icon on the right action bar:
  - LIKED (isLiked = true): The heart icon is filled/colored RED, PINK, or CORAL-RED (active liked state), regardless of whether the video behind it is black, dark, or bright.
  - NOT LIKED (isLiked = false): A white, grey, or hollow/outlined heart means NOT liked.
- Return isLiked = false ONLY if the heart is NOT red/pink/coral, OR no Like heart is visible, OR there is no TikTok UI at all (e.g., empty image with no icons/text, random photo, chat screen).
- Follow is optional — ONLY verify whether the Like heart is actively colored red/pink/coral.`;
  } else if (isFacebookTask) {
    platformRules = `FACEBOOK VERIFICATION RULES (READ CAREFULLY):
- Confirm the screenshot shows real Facebook post, video, or Reels UI (e.g., Facebook action bar with Like/Comment/Share buttons, Reels right-side action icons, or Facebook post chrome).
- CRITICAL — BLACK / DARK / LOADING VIDEO FRAMES ARE 100% VALID:
  - A black, dark, paused, buffering, or loading video background behind the Facebook/Reels UI is 100% VALID and MUST PASS as long as the Facebook UI and an active Like/Reaction icon are visible.
  - NEVER reject a screenshot just because the video area is black or dark!
- Check ONLY the Like / Reaction button:
  - LIKED (isLiked = true): The thumbs-up "Like" icon/text is colored/highlighted BLUE (or an active colored Facebook reaction like red Love heart / Care / Haha / Wow).
  - NOT LIKED (isLiked = false): A plain grey or hollow white outline thumbs-up means NOT liked.
- Return isLiked = false ONLY if the Like icon is uncolored/inactive, OR no Like icon is visible, OR there is no Facebook UI at all (e.g., empty image with no icons/text, random photo, chat screen).
- Follow is optional — ONLY verify whether the Like/reaction button is actively pressed.`;
  } else {
    platformRules = `SOCIAL MEDIA VERIFICATION RULES (READ CAREFULLY):
- Confirm the screenshot shows authentic social media post/video/reel/shorts UI (${expectedPlatform}).
- CRITICAL — BLACK / DARK / LOADING VIDEO FRAMES ARE 100% VALID:
  - A black, dark, dim, paused, or loading video background behind the social media UI overlay is completely normal and MUST BE ACCEPTED whenever the app UI and an active Like icon are clearly visible.
  - NEVER reject a screenshot just because the video content itself is black/dark!
- Check ONLY the Like button state:
  - TikTok: Heart icon on the right action bar is filled RED, PINK, or CORAL (white/grey heart = false).
  - Facebook: Thumbs-up "Like" button (or reaction like Love/Care) is colored BLUE or active colored reaction (plain grey/white outline = false).
  - YouTube / YouTube Shorts: The Like icon (either a HEART on m.youtube.com/shorts or a THUMBS-UP on YouTube app/web) is SOLID/FILLED — including SOLID WHITE on dark mode/Shorts, solid blue, or solid dark on light mode (only a hollow unfilled outline = false).
- Return isLiked = false ONLY if the Like icon is unliked/hollow, missing, or there is no social media UI at all (random photo, selfie, chat screen, or completely empty image with no UI).
- Follow/subscribe is optional — ONLY verify whether the LIKE icon itself is clearly active/pressed.`;
  }

  const promptText = `You are a precise automated screenshot verifier checking ONLY whether the user clicked "Like" on a ${expectedPlatform} video/post screenshot. A black/dark/loading video frame with visible app UI and an active Like button is ALWAYS VALID (isLiked = true).

${platformRules}

Respond strictly using the JSON schema.`;

  let lastError = null;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: parsedImage.mimeType,
                data: parsedImage.base64Data
              }
            },
            { text: promptText }
          ]
        },
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.MEDIUM },
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              isLiked: {
                type: Type.BOOLEAN,
                description: 'True if the screenshot clearly shows an active/filled Like icon for the expected platform.'
              },
              detectedPlatform: {
                type: Type.STRING,
                description: 'Detected platform (TikTok, Facebook, YouTube, or Unknown).'
              },
              reasonBn: {
                type: Type.STRING,
                description: 'Short natural Bengali explanation under 12 words.'
              },
              reasonEn: {
                type: Type.STRING,
                description: 'Short English explanation under 12 words.'
              },
              reasonAr: {
                type: Type.STRING,
                description: 'Short natural Arabic explanation under 12 words.'
              }
            },
            required: ['isLiked', 'detectedPlatform', 'reasonBn', 'reasonEn', 'reasonAr']
          }
        }
      });

      const rawText = (response.text || '{}').trim();
      const parsed = JSON.parse(rawText);
      const isLiked = Boolean(parsed.isLiked);

      return res.status(200).json({
        success: true,
        isLiked,
        detectedPlatform: String(parsed.detectedPlatform || expectedPlatform),
        reasonBn: String(parsed.reasonBn || (isLiked ? 'স্ক্রিনশটে লাইক শনাক্ত হয়েছে' : 'স্ক্রিনশটে সঠিক লাইক পাওয়া যায়নি')),
        reasonEn: String(parsed.reasonEn || (isLiked ? 'Active Like confirmed' : 'Active Like not found in screenshot')),
        reasonAr: String(parsed.reasonAr || (isLiked ? 'تم تأكيد الإعجاب بنجاح' : 'لم يتم العثور على إعجاب صالح في لقطة الشاشة'))
      });
    } catch (err) {
      lastError = err;
      const errMsg = String(err && err.message ? err.message : '');
      const statusCode = Number(err && (err.status || err.code)) || 0;
      const isAuthError = statusCode === 400 || statusCode === 403 || errMsg.includes('API_KEY_INVALID') || errMsg.includes('PERMISSION_DENIED') || errMsg.includes('API key not valid');

      if (isAuthError) {
        console.warn('[Verify-Like API] Invalid or unauthorized GEMINI_API_KEY configured in environment.');
        return res.status(statusCode === 403 ? 403 : 400).json({
          success: false,
          nonRetryable: true,
          code: 'API_KEY_INVALID',
          message: 'Gemini API কী সঠিক নয় — Settings > Secrets প্যানেল থেকে বৈধ GEMINI_API_KEY চেক বা সিলেক্ট করুন।',
          messageEn: 'Gemini API key is invalid or unauthorized. Please check server configuration.'
        });
      }

      if (attempt === 0) {
        await new Promise(r => setTimeout(r, 800));
      }
    }
  }

  console.error('[Verify-Like API] Transient Error:', lastError && lastError.message ? lastError.message : lastError);
  return res.status(502).json({
    success: false,
    message: 'স্ক্রিনশট যাচাই করতে সাময়িক সমস্যা হয়েছে।',
    messageEn: 'Temporary error verifying screenshot. Please wait.',
    reasonEn: 'Temporary verification error'
  });
}

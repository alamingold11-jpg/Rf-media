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
      message: 'সার্ভারে বৈধ GEMINI_API_KEY সেট করা নেই (Vercel Environment Variables বা Settings > Secrets চেক করুন)।'
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
      message: 'সঠিক ফরম্যাটের স্ক্রিনশট পাওয়া যায়নি'
    });
  }

  const expectedPlatform = String(body.platform || 'Social Media').trim();

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });

  const promptText = `You are a strict automated screenshot moderator verifying ONLY whether the user clicked "Like" on a ${expectedPlatform} post/video screenshot.

Inspect the uploaded screenshot carefully:
1. Check if this is an authentic social media post/video/reel/shorts screen (especially ${expectedPlatform}: TikTok, Facebook, or YouTube).
2. Check ONLY the Like button state:
   - TikTok: The heart icon on the right action bar MUST be filled/colored RED or PINK (active liked state). An empty white/grey heart outline means NOT liked (isLiked = false).
   - Facebook: The thumbs-up "Like" button (or active Facebook reaction like Love/Care) MUST be colored/highlighted BLUE or active ("Liked"). A plain grey/white outline thumbs-up means NOT liked (isLiked = false).
   - YouTube: The thumbs-up "Like" icon MUST be solid/filled (solid white on dark mode, solid dark/blue on light mode) rather than a hollow thin outline.
3. Return isLiked = false if:
   - The Like/heart icon is unliked / empty outline.
   - It is a random photo, selfie, wallpaper, blank screen, chat screen, or cropped screenshot where no active Like icon is visible.
   - Follow/subscribe is optional — ONLY verify whether the LIKE icon itself is clearly active/pressed.

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
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              isLiked: {
                type: Type.BOOLEAN,
                description: 'True only if the screenshot clearly shows an active/filled Like icon on a social media video/post.'
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
              }
            },
            required: ['isLiked', 'detectedPlatform', 'reasonBn', 'reasonEn']
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
        reasonEn: String(parsed.reasonEn || (isLiked ? 'Active Like confirmed' : 'Active Like not found in screenshot'))
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
          message: 'Gemini API কী সঠিক নয় — Settings > Secrets প্যানেল থেকে বৈধ GEMINI_API_KEY চেক বা সিলেক্ট করুন।'
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
    message: 'স্ক্রিনশট যাচাই করতে সাময়িক সমস্যা হয়েছে।'
  });
}

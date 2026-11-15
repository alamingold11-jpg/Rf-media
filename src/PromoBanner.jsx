import React, { useEffect, useState } from "react";

const BANNER_COPY = {
  bn: {
    headingHighlight: "দলীয়",
    headingRest: " উপহার",
    packageTitle: "অবস্থান ক্রয় করলে এককালীন",
    packageItems: [
      { label: "প্রথম পর্যায়", value: "৬%" },
      { label: "দ্বিতীয় পর্যায়", value: "২%" },
      { label: "তৃতীয় পর্যায়", value: "১%" },
    ],
    dailyTitle: "দৈনিক কাজের উপর উপহার",
    dailyItems: [
      { label: "প্রথম পর্যায়", value: "৩%" },
      { label: "দ্বিতীয় পর্যায়", value: "২%" },
      { label: "তৃতীয় পর্যায়", value: "১%" },
    ],
  },
  en: {
    headingHighlight: "Team",
    headingRest: " Bonus",
    packageTitle: "One-Time on Package Purchase",
    packageItems: [
      { label: "Level 1", value: "6%" },
      { label: "Level 2", value: "2%" },
      { label: "Level 3", value: "1%" },
    ],
    dailyTitle: "Bonus on Daily Tasks",
    dailyItems: [
      { label: "Level 1", value: "3%" },
      { label: "Level 2", value: "2%" },
      { label: "Level 3", value: "1%" },
    ],
  },
  ar: {
    headingHighlight: "مكافأة",
    headingRest: " الفريق",
    packageTitle: "مكافأة لمرة واحدة عند شراء الباقة",
    packageItems: [
      { label: "المستوى 1", value: "6%" },
      { label: "المستوى 2", value: "2%" },
      { label: "المستوى 3", value: "1%" },
    ],
    dailyTitle: "مكافأة المهام اليومية",
    dailyItems: [
      { label: "المستوى 1", value: "3%" },
      { label: "المستوى 2", value: "2%" },
      { label: "المستوى 3", value: "1%" },
    ],
  },
};

function resolveBannerLang() {
  try {
    if (window.aloI18n && typeof window.aloI18n.getLanguage === "function") {
      const l = window.aloI18n.getLanguage();
      if (l === "bn" || l === "ar" || l === "en") return l;
    }
    const isManual = localStorage.getItem("alo_lang_manual") === "1";
    const stored = localStorage.getItem("alo_lang") || localStorage.getItem("lang");
    if (isManual && (stored === "bn" || stored === "ar" || stored === "en")) {
      return stored;
    }
    const docLang = document.documentElement && document.documentElement.lang;
    if (docLang === "bn" || docLang === "ar" || docLang === "en") return docLang;
  } catch (e) {}
  return "en";
}

const Star = ({ color, size, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ position: "absolute", filter: "drop-shadow(0 4px 6px #0006)", pointerEvents: "none", ...style }}>
    <path d="M12 1l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill={color} />
  </svg>
);

const Coin = ({ size, style }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" style={{ position: "absolute", filter: "drop-shadow(0 4px 6px #0006)", pointerEvents: "none", ...style }}>
    <circle cx="22" cy="22" r="20" fill="#f7bd3a" />
    <circle cx="22" cy="22" r="14" fill="#ffd66b" />
    <text x="22" y="29" textAnchor="middle" fontSize="20" fontWeight="700" fill="#b87a00">৳</text>
  </svg>
);

const Gift = ({ style }) => (
  <svg width="46" height="46" viewBox="0 0 46 46" style={{ position: "absolute", filter: "drop-shadow(0 4px 6px #0006)", pointerEvents: "none", ...style }}>
    <rect x="5" y="19" width="36" height="24" rx="4" fill="#19b88a" />
    <rect x="3" y="12" width="40" height="10" rx="3" fill="#f7bd3a" />
    <rect x="20" y="12" width="6" height="31" fill="#2f7cf6" />
    <path d="M23 12c-8-9-14 0-6 0zM23 12c8-9 14 0 6 0z" fill="#6db3ff" />
  </svg>
);

const Section = ({ title, dot, items, colors }) => (
  <div style={{ marginTop: 20, padding: "0 4px", position: "relative" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, fontWeight: 600, marginBottom: 10 }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: dot, boxShadow: `0 0 8px ${dot}` }} />
      {title}
    </div>
    <div style={{ display: "flex", gap: 8 }}>
      {items.map((it, i) => (
        <div key={i} style={{ flex: 1, textAlign: "center", padding: 4 }}>
          <div style={{ fontSize: 12, color: "#9fb3d9" }}>{it.label}</div>
          <div style={{ fontSize: 30, fontWeight: 700, color: colors[i] }}>{it.value}</div>
        </div>
      ))}
    </div>
  </div>
);

export default function PromoBanner() {
  const [lang, setLang] = useState(resolveBannerLang);

  useEffect(() => {
    const syncLang = () => setLang(resolveBannerLang());
    syncLang();

    const handleLangChanged = (e) => {
      const next = e && e.detail && e.detail.lang;
      if (next === "bn" || next === "ar" || next === "en") {
        setLang(next);
      } else {
        syncLang();
      }
    };

    window.addEventListener("alo-language-changed", handleLangChanged);
    window.addEventListener("DOMContentLoaded", syncLang);

    const observer = new MutationObserver(() => syncLang());
    if (document.documentElement) {
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    }

    return () => {
      window.removeEventListener("alo-language-changed", handleLangChanged);
      window.removeEventListener("DOMContentLoaded", syncLang);
      observer.disconnect();
    };
  }, []);

  const copy = BANNER_COPY[lang] || BANNER_COPY.en;

  return (
    <div
      data-no-translate="true"
      dir={lang === "ar" ? "rtl" : "ltr"}
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        borderRadius: 20,
        color: "#eaf1ff",
        padding: "20px 16px 18px",
        fontFamily: "'Hind Siliguri', system-ui, sans-serif",
        background:
          "radial-gradient(90% 60% at 90% 0%, #14367a 0%, transparent 65%), linear-gradient(180deg, #0d1f48 0%, #0a1838 60%, #081330 100%)",
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@500;600;700&display=swap');`}</style>

      <Coin size={44} style={{ left: 10, top: 14 }} />
      <Gift style={{ right: 12, top: 12 }} />
      <Star color="#6db3ff" size={22} style={{ left: 56, top: 70 }} />
      <Star color="#f7bd3a" size={18} style={{ right: 60, top: 72 }} />
      <Star color="#2f7cf6" size={34} style={{ right: 6, bottom: 6 }} />
      <Coin size={30} style={{ left: 8, bottom: 8 }} />

      <div style={{ position: "relative", textAlign: "center" }}>
        <span
          style={{
            display: "inline-block",
            background: "linear-gradient(90deg, #2f7cf6, #5aa2ff)",
            padding: "3px 14px",
            borderRadius: 99,
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: 1.5,
          }}
        >
          PW NEW MEDIA
        </span>
        <div style={{ fontSize: 28, lineHeight: 1.25, marginTop: 8, fontWeight: 700 }}>
          <span style={{ color: "#f7bd3a" }}>{copy.headingHighlight}</span>
          {copy.headingRest}
        </div>
      </div>

      <Section
        title={copy.packageTitle}
        dot="#f7bd3a"
        colors={["#6db3ff", "#6db3ff", "#6db3ff"]}
        items={copy.packageItems}
      />

      <Section
        title={copy.dailyTitle}
        dot="#19b88a"
        colors={["#19b88a", "#5fe0b8", "#5fe0b8"]}
        items={copy.dailyItems}
      />
    </div>
  );
}

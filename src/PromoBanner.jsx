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
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    style={{
      position: "absolute",
      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
      pointerEvents: "none",
      ...style,
    }}
  >
    <path d="M12 1l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill={color} />
  </svg>
);

const Coin = ({ size, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 44 44"
    style={{
      position: "absolute",
      filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.32))",
      pointerEvents: "none",
      ...style,
    }}
  >
    <circle cx="22" cy="22" r="20" fill="#f7bd3a" />
    <circle cx="22" cy="22" r="14" fill="#ffd66b" />
    <text x="22" y="29" textAnchor="middle" fontSize="20" fontWeight="700" fill="#b87a00">
      ৳
    </text>
  </svg>
);

const Gift = ({ size = 32, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 46 46"
    style={{
      position: "absolute",
      filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.32))",
      pointerEvents: "none",
      ...style,
    }}
  >
    <rect x="5" y="19" width="36" height="24" rx="4" fill="#19b88a" />
    <rect x="3" y="12" width="40" height="10" rx="3" fill="#f7bd3a" />
    <rect x="20" y="12" width="6" height="31" fill="#1264c9" />
    <path d="M23 12c-8-9-14 0-6 0zM23 12c8-9 14 0 6 0z" fill="#35c6e7" />
  </svg>
);

const Section = ({ title, dot, items, colors }) => (
  <div
    style={{
      marginTop: 8,
      padding: "6px 8px 5px",
      borderRadius: 11,
      background: "rgba(7, 27, 80, 0.52)",
      border: "1px solid rgba(53, 198, 231, 0.16)",
      position: "relative",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 12,
        fontWeight: 600,
        color: "#dbeafe",
        marginBottom: 4,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: dot,
          boxShadow: `0 0 7px ${dot}`,
          flexShrink: 0,
        }}
      />
      {title}
    </div>
    <div style={{ display: "flex", gap: 6 }}>
      {items.map((it, i) => (
        <div key={i} style={{ flex: 1, textAlign: "center", padding: "1px 2px" }}>
          <div style={{ fontSize: 10.5, color: "#9ec5fe", lineHeight: 1.2 }}>{it.label}</div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              lineHeight: 1.15,
              marginTop: 1,
              color: colors[i],
            }}
          >
            {it.value}
          </div>
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
        borderRadius: 16,
        color: "#e9f2ff",
        padding: "11px 12px 10px",
        fontFamily: "'Hind Siliguri', system-ui, sans-serif",
        border: "1px solid rgba(53, 198, 231, 0.28)",
        boxShadow:
          "0 8px 20px rgba(3, 12, 42, 0.34), inset 0 1px 0 rgba(255, 255, 255, 0.14)",
        background:
          "radial-gradient(88% 68% at 90% 0%, rgba(53, 198, 231, 0.24) 0%, transparent 62%), radial-gradient(75% 60% at 8% 100%, rgba(18, 100, 201, 0.32) 0%, transparent 65%), linear-gradient(165deg, #10358c 0%, #0b256a 55%, #071b50 100%)",
      }}
    >
      <Coin size={28} style={{ left: 10, top: 10 }} />
      <Gift size={30} style={{ right: 10, top: 9 }} />
      <Star color="#35c6e7" size={14} style={{ left: 46, top: 38, opacity: 0.9 }} />
      <Star color="#f7bd3a" size={12} style={{ right: 48, top: 39, opacity: 0.9 }} />
      <Star color="#168bff" size={18} style={{ right: 5, bottom: 5, opacity: 0.65 }} />
      <Coin size={18} style={{ left: 6, bottom: 6, opacity: 0.8 }} />

      <div style={{ position: "relative", textAlign: "center" }}>
        <span
          style={{
            display: "inline-block",
            background: "linear-gradient(90deg, #1264c9, #35c6e7)",
            color: "#ffffff",
            padding: "2px 11px",
            borderRadius: 99,
            fontWeight: 700,
            fontSize: 10.5,
            letterSpacing: 1.3,
          }}
        >
          PW NEW MEDIA
        </span>
        <div
          style={{
            fontSize: 20,
            lineHeight: 1.18,
            marginTop: 4,
            fontWeight: 700,
            color: "#ffffff",
          }}
        >
          <span style={{ color: "#ffd166" }}>{copy.headingHighlight}</span>
          {copy.headingRest}
        </div>
      </div>

      <Section
        title={copy.packageTitle}
        dot="#ffd166"
        colors={["#35c6e7", "#60a5fa", "#93c5fd"]}
        items={copy.packageItems}
      />

      <Section
        title={copy.dailyTitle}
        dot="#34d399"
        colors={["#34d399", "#5eead4", "#6ee7b7"]}
        items={copy.dailyItems}
      />
    </div>
  );
}

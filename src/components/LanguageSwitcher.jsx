import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="language-switcher-pro">
      <span
        className={lang === "ar" ? "active" : ""}
        style={{ cursor: "pointer" }}
        onClick={() => i18n.changeLanguage("ar")}
      >
        عربي
      </span>
      <span style={{ margin: "0 8px", color: "#888" }}>|</span>
      <span
        className={lang === "en" ? "active" : ""}
        style={{ cursor: "pointer" }}
        onClick={() => i18n.changeLanguage("en")}
      >
        English
      </span>
    </div>
  );
}

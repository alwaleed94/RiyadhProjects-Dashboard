import React from "react";
import { useTranslation } from "react-i18next";
import ProgressRing from "./ProgressRing";
import { getLocalizedValue } from "../lib/projectUtils";

function progressBadge(type, lang) {
  if (lang === "en") {
    switch (type) {
      case "official":
        return "Official";
      case "official-subproject":
        return "Official (Subproject)";
      case "target-indicator":
        return "Target Indicator";
      default:
        return "Phased Status";
    }
  }

  switch (type) {
    case "official":
      return "رسمي";
    case "official-subproject":
      return "رسمي لمؤشر فرعي";
    case "target-indicator":
      return "مؤشر متابعة";
    default:
      return "حالة مرحلية";
  }
}

export default function ProjectCard({ project, selected, onSelect }) {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const hasNumericProgress = typeof project.progress === "number";

  return (
    <article
      className={`project-card ${selected ? "selected" : ""}`}
      onClick={() => onSelect(project.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelect(project.id);
        }
      }}
    >
      <div className="project-card__top" style={{ background: project.gradient }}>
        <div>
          <span className="pill">{getLocalizedValue(project.category, lang, "")}</span>
          <h3>
            {project.icon} {getLocalizedValue(project.name, lang, "")}
          </h3>
          <p>{getLocalizedValue(project.summary, lang, "")}</p>
          {project.image && (
            <img
              src={project.image}
              alt={getLocalizedValue(project.name, lang, "")}
              style={{
                width: "100%",
                height: "120px",
                objectFit: "cover",
                borderRadius: "8px",
                marginTop: "10px",
                border: "2px solid rgba(255,255,255,0.2)"
              }}
            />
          )}
        </div>
        <div className="project-card__ring">
          {hasNumericProgress ? (
            <ProgressRing
              value={project.progress}
              label={getLocalizedValue(project.progressLabel, lang, "")}
            />
          ) : (
            <div className="no-progress">
              <strong>{getLocalizedValue(project.progressLabel, lang, "")}</strong>
              <span>{lang === "ar" ? "لا توجد نسبة موحدة" : "No official percentage"}</span>
            </div>
          )}
        </div>
      </div>

      <div className="project-card__body">
        <div className="mini-grid">
          <div>
            <span className="mini-label">{lang === "ar" ? "الحالة" : "Status"}</span>
            <strong>{getLocalizedValue(project.status, lang, "")}</strong>
          </div>
          <div>
            <span className="mini-label">{lang === "ar" ? "نوع النسبة" : "Progress Type"}</span>
            <strong>{progressBadge(project.progressType, lang)}</strong>
          </div>
          <div>
            <span className="mini-label">{lang === "ar" ? "المتبقي" : "Remaining"}</span>
            <strong>
              {typeof project.remaining === "number" ? `${project.remaining}%` : lang === "ar" ? "غير متاح" : "N/A"}
            </strong>
          </div>
        </div>

        <div className="bar-wrap">
          <div className="bar-meta">
            <span>{lang === "ar" ? "المحقق" : "Achieved"}</span>
            <span>{getLocalizedValue(project.progressLabel, lang, "")}</span>
          </div>
          <div className="bar">
            <div
              className="bar-fill"
              style={{
                width: hasNumericProgress ? `${project.progress}%` : "18%",
                background: project.gradient
              }}
            />
          </div>
        </div>

        <div className="detail-box">
          <h4>{lang === "ar" ? "ما تحقق" : "Achieved"}</h4>
          <p>{getLocalizedValue(project.achievedText, lang, "")}</p>
        </div>

        <div className="detail-box">
          <h4>{lang === "ar" ? "ما المتبقي" : "Remaining Work"}</h4>
          <p>{getLocalizedValue(project.remainingText, lang, "")}</p>
        </div>

        <div className="impact-box">
          <h4>{lang === "ar" ? "الآثار الإيجابية" : "Positive Impacts"}</h4>
          <ul>
            {project.positiveImpacts.map((item, idx) => (
              <li key={idx}>{getLocalizedValue(item, lang, "")}</li>
            ))}
          </ul>
        </div>

        <div className="metrics-grid">
          {project.metrics.map((metric, idx) => (
            <div className="metric-card" key={idx}>
              <span>{getLocalizedValue(metric.label, lang, "")}</span>
              <strong>{getLocalizedValue(metric.value, lang, "")}</strong>
            </div>
          ))}
        </div>

        <div className="source-note">
          <strong>{lang === "ar" ? "ملاحظة البيانات:" : "Data Note:"}</strong>{" "}
          {getLocalizedValue(project.sourceNote, lang, "")}
        </div>
      </div>
    </article>
  );
}

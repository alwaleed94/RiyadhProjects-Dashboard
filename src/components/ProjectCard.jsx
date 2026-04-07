import React from "react";
import ProgressRing from "./ProgressRing";

function progressBadge(type) {
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
  const hasNumericProgress = typeof project.progress === "number";

  return (
    <article
      className={`project-card ${selected ? "selected" : ""}`}
      onClick={() => onSelect(project.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect(project.id);
      }}
    >
      <div className="project-card__top" style={{ background: project.gradient }}>
        <div>
          <span className="pill">{project.category}</span>
          <h3>{project.icon} {project.name}</h3>
          <p>{project.summary}</p>
          {project.image && (
            <img 
              src={project.image} 
              alt={project.name}
              style={{ 
                width: '100%', 
                height: '120px', 
                objectFit: 'cover', 
                borderRadius: '8px', 
                marginTop: '10px',
                border: '2px solid rgba(255,255,255,0.2)'
              }}
            />
          )}
        </div>

        <div className="project-card__ring">
          {hasNumericProgress ? (
            <ProgressRing value={project.progress} label={project.progressLabel} />
          ) : (
            <div className="no-progress">
              <strong>{project.progressLabel}</strong>
              <span>لا توجد نسبة موحدة</span>
            </div>
          )}
        </div>
      </div>

      <div className="project-card__body">
        <div className="mini-grid">
          <div>
            <span className="mini-label">الحالة</span>
            <strong>{project.status}</strong>
          </div>
          <div>
            <span className="mini-label">نوع النسبة</span>
            <strong>{progressBadge(project.progressType)}</strong>
          </div>
          <div>
            <span className="mini-label">المتبقي</span>
            <strong>
              {typeof project.remaining === "number"
                ? `${project.remaining}%`
                : "غير متاح"}
            </strong>
          </div>
        </div>

        <div className="bar-wrap">
          <div className="bar-meta">
            <span>المحقق</span>
            <span>{project.progressLabel}</span>
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
          <h4>ما تحقق</h4>
          <p>{project.achievedText}</p>
        </div>

        <div className="detail-box">
          <h4>ما المتبقي</h4>
          <p>{project.remainingText}</p>
        </div>

        <div className="impact-box">
          <h4>الآثار الإيجابية</h4>
          <ul>
            {project.positiveImpacts.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="metrics-grid">
          {project.metrics.map((metric) => (
            <div className="metric-card" key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </div>
          ))}
        </div>

        <div className="source-note">
          <strong>ملاحظة البيانات:</strong> {project.sourceNote}
        </div>
      </div>
    </article>
  );
}
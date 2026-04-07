import React, { useState, useEffect } from "react";

export default function ProgressRing({ value, label }) {
  const safeValue =
    typeof value === "number" ? Math.max(0, Math.min(100, value)) : 0;

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (safeValue / 100) * circumference;
  
  const [isDark, setIsDark] = useState(document.documentElement.getAttribute("data-theme") !== "light");

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute("data-theme") !== "light");
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="ring-wrap">
      <svg className="ring" viewBox="0 0 120 120" aria-hidden="true">
        <circle className="ring-bg" cx="60" cy="60" r={radius} />
        <circle
          className="ring-progress"
          cx="60"
          cy="60"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ stroke: isDark ? "white" : "#3b82f6" }}
        />
      </svg>
      <div className="ring-text">
        <strong>{label}</strong>
      </div>
    </div>
  );
}
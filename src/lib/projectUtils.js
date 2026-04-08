const isLocalizedObject = (value) =>
  value && typeof value === "object" && !Array.isArray(value);

function fixEncoding(value) {
  if (typeof value !== "string") {
    return value;
  }

  if (!/[ØÙÂð]/.test(value)) {
    return value;
  }

  try {
    return decodeURIComponent(escape(value));
  } catch {
    return value;
  }
}

export function getLocalizedValue(value, language = "ar", fallback = "") {
  if (value == null) {
    return fallback;
  }

  if (isLocalizedObject(value)) {
    return fixEncoding(
      value[language] ?? value.ar ?? value.en ?? Object.values(value)[0] ?? fallback
    );
  }

  return fixEncoding(value);
}

export function normalizeProject(project) {
  const progressLabel =
    typeof project.progressLabel === "object"
      ? project.progressLabel
      : {
          ar:
            typeof project.progress === "number"
              ? `${project.progress}%`
              : project.progressLabel || "غير معلن",
          en:
            typeof project.progress === "number"
              ? `${project.progress}%`
              : project.progressLabel || "Not announced"
        };

  const normalizedPositiveImpacts = Array.isArray(project.positiveImpacts)
    ? project.positiveImpacts.map((item) =>
        isLocalizedObject(item) ? item : { ar: item, en: item }
      )
    : [];

  const normalizedMetrics = Array.isArray(project.metrics)
    ? project.metrics.map((metric) => ({
        label: isLocalizedObject(metric.label) ? metric.label : { ar: metric.label, en: metric.label },
        value: isLocalizedObject(metric.value) ? metric.value : { ar: metric.value, en: metric.value }
      }))
    : [];

  return {
    ...project,
    name: isLocalizedObject(project.name) ? project.name : { ar: project.name, en: project.name },
    category: isLocalizedObject(project.category)
      ? project.category
      : { ar: project.category, en: project.category },
    summary: isLocalizedObject(project.summary)
      ? project.summary
      : { ar: project.summary, en: project.summary },
    status: isLocalizedObject(project.status) ? project.status : { ar: project.status, en: project.status },
    progressLabel,
    achievedText: isLocalizedObject(project.achievedText)
      ? project.achievedText
      : { ar: project.achievedText || "", en: project.achievedText || "" },
    remainingText: isLocalizedObject(project.remainingText)
      ? project.remainingText
      : { ar: project.remainingText || "", en: project.remainingText || "" },
    iconLabel: isLocalizedObject(project.iconLabel)
      ? project.iconLabel
      : { ar: project.iconLabel || "", en: project.iconLabel || "" },
    sourceNote: isLocalizedObject(project.sourceNote)
      ? project.sourceNote
      : { ar: project.sourceNote || "", en: project.sourceNote || "" },
    positiveImpacts: normalizedPositiveImpacts,
    metrics: normalizedMetrics
  };
}

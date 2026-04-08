import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { useTranslation } from "react-i18next";
import { getLocalizedValue } from "../lib/projectUtils";

const COLORS = ["#22c55e", "#0ea5e9", "#f59e0b", "#8b5cf6", "#ef4444", "#14b8a6"];

function ChartTooltip({ active, payload, lang, type }) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0].payload;
  const title = type === "progress" ? data.chartName : data.name;

  return (
    <div className="chart-tooltip" dir={lang === "ar" ? "rtl" : "ltr"}>
      <strong>{title}</strong>
      {type === "progress" ? (
        <>
          <p>{lang === "ar" ? `نسبة الإنجاز: ${data.progress}%` : `Progress: ${data.progress}%`}</p>
          <span>{data.chartProgressLabel}</span>
        </>
      ) : (
        <>
          <p>{lang === "ar" ? `عدد المشاريع: ${data.value}` : `Projects: ${data.value}`}</p>
          <span>{data.shareText}</span>
        </>
      )}
    </div>
  );
}

export default function ChartsPanel({
  projects,
  selectedId,
  onProjectSelect,
  activeCategory,
  onCategoryChange
}) {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [hoveredCategory, setHoveredCategory] = useState("");

  const categoryData = useMemo(() => {
    const categoryMap = {};

    projects.forEach((project) => {
      const categoryName = getLocalizedValue(project.category, lang, "");
      const categoryKey = getLocalizedValue(project.category, "en", categoryName);

      if (!categoryMap[categoryKey]) {
        categoryMap[categoryKey] = {
          key: categoryKey,
          name: categoryName,
          value: 0,
          projects: []
        };
      }

      categoryMap[categoryKey].value += 1;
      categoryMap[categoryKey].projects.push({
        id: project.id,
        name: getLocalizedValue(project.name, lang, "")
      });
    });

    return Object.values(categoryMap).map((entry, index, items) => ({
      ...entry,
      color: COLORS[index % COLORS.length],
      share: items.length ? Math.round((entry.value / projects.length) * 100) : 0,
      shareText:
        lang === "ar"
          ? `${Math.round((entry.value / projects.length) * 100)}% من إجمالي المشاريع`
          : `${Math.round((entry.value / projects.length) * 100)}% of all projects`
    }));
  }, [projects, lang]);

  const activeCategoryKey = hoveredCategory || activeCategory;
  const activeCategoryData =
    categoryData.find((entry) => entry.key === activeCategoryKey) || categoryData[0] || null;

  const numericProjects = useMemo(
    () => projects.filter((project) => typeof project.progress === "number"),
    [projects]
  );

  const barData = useMemo(
    () =>
      numericProjects.map((project) => ({
        ...project,
        chartName: getLocalizedValue(project.name, lang, ""),
        chartProgressLabel: getLocalizedValue(project.progressLabel, lang, ""),
        categoryKey: getLocalizedValue(project.category, "en", ""),
        categoryMatch:
          !activeCategoryKey || getLocalizedValue(project.category, "en", "") === activeCategoryKey
      })),
    [numericProjects, lang, activeCategoryKey]
  );

  const selectedProject =
    barData.find((project) => project.id === selectedId) || barData[0] || null;

  const topProject = [...numericProjects].sort((a, b) => b.progress - a.progress)[0] || null;
  const averageProgress = numericProjects.length
    ? Math.round(
        numericProjects.reduce((sum, project) => sum + project.progress, 0) / numericProjects.length
      )
    : 0;

  return (
    <section className="charts-grid">
      <div className="dashboard-panel chart-stage">
        <div className="panel-header">
          <h2>{lang === "ar" ? "نسب الإنجاز" : "Completion Rates"}</h2>
          <p>
            {lang === "ar"
              ? "عرض تفاعلي يوضح تفاوت الإنجاز بين المشاريع مع إمكانية الانتقال المباشر إلى البطاقة."
              : "An interactive view of completion gaps with direct project drill-down."}
          </p>
        </div>

        <div className="chart-spotlight-grid">
          <div className="chart-spotlight-card">
            <span>{lang === "ar" ? "متوسط الإنجاز" : "Average Progress"}</span>
            <strong>{averageProgress}%</strong>
          </div>
          <div className="chart-spotlight-card">
            <span>{lang === "ar" ? "الأعلى تقدمًا" : "Leading Project"}</span>
            <strong>
              {topProject ? getLocalizedValue(topProject.name, lang, "") : "--"}
            </strong>
          </div>
          <div className="chart-spotlight-card">
            <span>{lang === "ar" ? "المشروع المحدد" : "Selected Project"}</span>
            <strong>
              {selectedProject ? getLocalizedValue(selectedProject.name, lang, "") : "--"}
            </strong>
          </div>
        </div>

        <div className="chart-shell">
          <div className="chart-canvas">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} barCategoryGap={18}>
                <XAxis
                  dataKey="chartName"
                  angle={-20}
                  textAnchor="end"
                  height={68}
                  interval={0}
                  fontSize={12}
                  stroke="#94a3b8"
                />
                <YAxis stroke="#94a3b8" />
                <Tooltip content={<ChartTooltip lang={lang} type="progress" />} />
                <Bar
                  dataKey="progress"
                  radius={[12, 12, 0, 0]}
                  onClick={(data) => onProjectSelect?.(data.id)}
                >
                  {barData.map((entry) => (
                    <Cell
                      key={entry.id}
                      fill={
                        selectedId === entry.id
                          ? "#38bdf8"
                          : entry.categoryMatch
                            ? "#22c55e"
                            : "#94a3b8"
                      }
                      fillOpacity={selectedId === entry.id ? 1 : entry.categoryMatch ? 0.88 : 0.28}
                      cursor="pointer"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-side-list">
            {barData.map((project) => (
              <button
                key={project.id}
                type="button"
                className={`chart-rank-item ${
                  selectedId === project.id ? "active" : ""
                } ${project.categoryMatch ? "category-match" : "category-dimmed"}`}
                onClick={() => onProjectSelect?.(project.id)}
              >
                <span className="chart-rank-item__title">
                  {project.icon} {project.chartName}
                </span>
                <strong>{project.progress}%</strong>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-panel chart-stage">
        <div className="panel-header">
          <h2>{lang === "ar" ? "توزيع المشاريع حسب التصنيف" : "Projects by Category"}</h2>
          <p>
            {lang === "ar"
              ? "اختر أي تصنيف لاستكشاف حصته والمشاريع المرتبطة به مباشرة."
              : "Pick any category to explore its share and the projects behind it."}
          </p>
        </div>

        <div className="chart-shell chart-shell--split">
          <div className="category-donut-wrap">
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={78}
                  outerRadius={118}
                  paddingAngle={4}
                  activeIndex={categoryData.findIndex((entry) => entry.key === activeCategoryKey)}
                  onMouseEnter={(_, index) => setHoveredCategory(categoryData[index]?.key || "")}
                  onMouseLeave={() => setHoveredCategory("")}
                  onClick={(entry) => onCategoryChange?.(entry.key)}
                >
                  {categoryData.map((entry) => (
                    <Cell
                      key={entry.key}
                      fill={entry.color}
                      cursor="pointer"
                      stroke={
                        activeCategoryKey === entry.key ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.2)"
                      }
                      strokeWidth={activeCategoryKey === entry.key ? 3 : 1}
                    />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip lang={lang} type="category" />} />
              </PieChart>
            </ResponsiveContainer>

          </div>

          <div className="category-insights">
            <div className="category-chip-list">
              {categoryData.map((entry) => (
                <button
                  key={entry.key}
                  type="button"
                  className={`category-chip ${activeCategoryKey === entry.key ? "active" : ""}`}
                  onClick={() => onCategoryChange?.(entry.key)}
                  onMouseEnter={() => setHoveredCategory(entry.key)}
                  onMouseLeave={() => setHoveredCategory("")}
                >
                  <span
                    className="category-chip__dot"
                    style={{ background: entry.color }}
                  />
                  {entry.name}
                  <strong>{entry.value}</strong>
                </button>
              ))}
            </div>

            <div className="category-focus-card">
              <span>{lang === "ar" ? "المشاريع ضمن التصنيف" : "Projects in Category"}</span>
              <strong>{activeCategoryData?.name || "--"}</strong>
              <div className="category-focus-list">
                {(activeCategoryData?.projects || []).map((project) => (
                  <button
                    key={project.id}
                    type="button"
                    className={`category-focus-pill ${selectedId === project.id ? "active" : ""}`}
                    onClick={() => onProjectSelect?.(project.id)}
                  >
                    {project.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

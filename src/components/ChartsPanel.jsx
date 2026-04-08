import React from "react";
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

const COLORS = ["#22c55e", "#0ea5e9", "#f59e0b", "#8b5cf6", "#ef4444"];

function CustomTooltip({ active, payload, lang }) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0].payload;

  return (
    <div
      style={{
        background: "white",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        direction: lang === "ar" ? "rtl" : "ltr",
        textAlign: lang === "ar" ? "right" : "left"
      }}
    >
      <p style={{ margin: "0 0 5px 0", fontWeight: "bold" }}>
        {lang === "ar" ? `التصنيف: ${data.name}` : `Category: ${data.name}`}
      </p>
      <p style={{ margin: "0 0 5px 0" }}>
        {lang === "ar" ? `عدد المشاريع: ${data.value}` : `Projects: ${data.value}`}
      </p>
      <p style={{ margin: "0", fontSize: "12px" }}>
        <strong>{lang === "ar" ? "المشاريع:" : "Projects:"}</strong>
        <br />
        {data.projects.join(", ")}
      </p>
    </div>
  );
}

export default function ChartsPanel({ projects }) {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const numericProjects = projects.filter((p) => typeof p.progress === "number");

  const categoryMap = {};
  projects.forEach((project) => {
    const categoryName = getLocalizedValue(project.category, lang, "");
    if (!categoryMap[categoryName]) {
      categoryMap[categoryName] = { count: 0, projects: [] };
    }
    categoryMap[categoryName].count += 1;
    categoryMap[categoryName].projects.push(getLocalizedValue(project.name, lang, ""));
  });

  const categoryData = Object.entries(categoryMap).map(([name, data]) => ({
    name,
    value: data.count,
    projects: data.projects
  }));

  const barData = numericProjects.map((project) => ({
    ...project,
    chartName: getLocalizedValue(project.name, lang, ""),
    chartProgressLabel: getLocalizedValue(project.progressLabel, lang, "")
  }));

  return (
    <section className="charts-grid">
      <div className="dashboard-panel">
        <h2>{lang === "ar" ? "نسب الإنجاز" : "Completion Rates"}</h2>
        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer>
            <BarChart data={barData}>
              <XAxis
                dataKey="chartName"
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
                fontSize={12}
              />
              <YAxis />
              <Tooltip
                formatter={(value) => `${value}%`}
                labelFormatter={(value) => value}
              />
              <Bar dataKey="progress" fill="#22c55e" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="dashboard-panel">
        <h2>{lang === "ar" ? "توزيع المشاريع حسب التصنيف" : "Projects by Category"}</h2>
        <div
          style={{
            width: "100%",
            height: 320,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            <div style={{ width: 340, height: 320, minWidth: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={100} label>
                    {categoryData.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip lang={lang} />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {categoryData.map((entry, index) => (
                <div key={entry.name} style={{ display: "flex", alignItems: "center", fontSize: 15 }}>
                  <span
                    style={{
                      display: "inline-block",
                      width: 16,
                      height: 16,
                      borderRadius: 3,
                      background: COLORS[index % COLORS.length],
                      marginInlineEnd: 8,
                      border: "1px solid #ddd"
                    }}
                  />
                  <span style={{ fontWeight: 500 }}>{entry.name}</span>
                  <span style={{ marginInlineStart: 6, color: "#666", fontSize: 13 }}>
                    ({entry.value})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

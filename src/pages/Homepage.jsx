import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { projects as baseProjects } from "../data/projects";
import { getStoredProjects } from "../lib/storage";
import { getLocalizedValue, normalizeProject } from "../lib/projectUtils";
import ProjectCard from "../components/ProjectCard";
import MapView from "../components/MapView";
import ChartsPanel from "../components/ChartsPanel";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function Homepage() {
  const { t, i18n } = useTranslation();
  const [customProjects, setCustomProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedId, setSelectedId] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    setCustomProjects(getStoredProjects());
  }, []);

  const allProjects = useMemo(
    () => [...baseProjects, ...customProjects].map(normalizeProject),
    [customProjects]
  );

  useEffect(() => {
    if (!allProjects.length) {
      setSelectedId("");
      return;
    }

    const exists = allProjects.some((project) => project.id === selectedId);
    if (!exists) {
      setSelectedId(allProjects[0].id);
    }
  }, [allProjects, selectedId]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const categoryOptions = [
    { key: "all", label: t("all") },
    { key: "transport", label: t("transport") },
    { key: "qualityOfLife", label: t("qualityOfLife") },
    { key: "urbanDevelopment", label: t("urbanDevelopment") },
    { key: "environment", label: t("environment") },
    { key: "heritageAndTourism", label: t("heritageAndTourism") }
  ];

  const categoryMap = {
    all: "الكل",
    transport: "نقل",
    qualityOfLife: "جودة حياة",
    urbanDevelopment: "تطوير حضري",
    environment: "بيئة",
    heritageAndTourism: "تراث وسياحة"
  };

  const filteredProjects = useMemo(() => {
    const term = search.trim().toLowerCase();

    return allProjects.filter((project) => {
      const name = String(getLocalizedValue(project.name, i18n.language, "")).toLowerCase();
      const summary = String(getLocalizedValue(project.summary, i18n.language, "")).toLowerCase();
      const localizedCategory = String(
        getLocalizedValue(project.category, i18n.language, "")
      ).toLowerCase();
      const arabicCategory = String(getLocalizedValue(project.category, "ar", "")).toLowerCase();

      const matchSearch =
        !term ||
        name.includes(term) ||
        summary.includes(term) ||
        localizedCategory.includes(term) ||
        arabicCategory.includes(term);

      const matchCategory =
        category === "all" || getLocalizedValue(project.category, "ar", "") === categoryMap[category];

      return matchSearch && matchCategory;
    });
  }, [search, category, allProjects, i18n.language]);

  const selectedProject =
    filteredProjects.find((project) => project.id === selectedId) || filteredProjects[0] || null;

  const numericProjects = filteredProjects.filter((project) => typeof project.progress === "number");
  const averageProgress = numericProjects.length
    ? Math.round(numericProjects.reduce((sum, project) => sum + project.progress, 0) / numericProjects.length)
    : 0;
  const completedCount = filteredProjects.filter((project) => project.progress === 100).length;
  const inProgressCount = filteredProjects.filter(
    (project) => typeof project.progress === "number" && project.progress < 100
  ).length;
  const positiveImpactCount = filteredProjects.reduce(
    (sum, project) => sum + project.positiveImpacts.length,
    0
  );

  return (
    <div className="app-shell">
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: i18n.language === "ar" ? "flex-start" : "flex-end",
          alignItems: "center",
          padding: "18px 0 0 0",
          position: "relative",
          zIndex: 1000
        }}
      >
        <LanguageSwitcher />
      </div>

      <footer className="footer">
        <div className="footer-content">
          <p>
            {t("implementedBy")}{" "}
            <strong>{i18n.language === "ar" ? "الوليد بن نوح" : "ALWALEED BIN NOUH"}</strong> © 2026
          </p>
          <p style={{ margin: 0, whiteSpace: "nowrap" }}>
            <a href="mailto:alwaleednu@gmail.com" className="footer-link" style={{ marginLeft: 10 }}>
              alwaleednu@gmail.com
            </a>
            <span style={{ margin: "0 8px" }}>|</span>
            <a
              href="https://www.linkedin.com/in/alwaleed-bin-nouh-/"
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginRight: 10 }}
            >
              LinkedIn Profile
            </a>
          </p>
        </div>
      </footer>

      <header className="hero">
        <div className="hero__overlay" />

        <div className="container hero__content">
          <div className="hero__text">
            <div className="top-line">
              <span className="hero-badge">{t("interactiveDashboard")}</span>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  className="theme-toggle"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? t("light") : t("dark")}
                </button>
                <Link
                  to="/login"
                  style={{
                    padding: "8px 16px",
                    background: "#3b82f6",
                    color: "white",
                    borderRadius: "6px",
                    textDecoration: "none",
                    cursor: "pointer"
                  }}
                >
                  {t("adminLogin")}
                </Link>
              </div>
            </div>

            <h1>{t("riyadhProjects")}</h1>
            <p>{t("description")}</p>

            <div className="kpi-grid">
              <div className="kpi-card">
                <span>{t("totalProjects")}</span>
                <strong>{filteredProjects.length}</strong>
              </div>

              <div className="kpi-card">
                <span>{t("averageProgress")}</span>
                <strong>{averageProgress}%</strong>
              </div>

              <div className="kpi-card">
                <span>{t("completedProjects")}</span>
                <strong>{completedCount}</strong>
              </div>

              <div className="kpi-card">
                <span>{t("projectsInProgress")}</span>
                <strong>{inProgressCount}</strong>
              </div>

              <div className="kpi-card">
                <span>{t("totalPositiveImpacts")}</span>
                <strong>{positiveImpactCount}</strong>
              </div>
            </div>
          </div>

          <div className="hero__glass">
            <h2>{t("quickSummary")}</h2>
            <p>{t("summaryNote")}</p>

            {selectedProject && (
              <div className="hero-focus">
                <span>{t("selectedProject")}</span>
                <strong>{getLocalizedValue(selectedProject.name, i18n.language, "")}</strong>
                <small>{getLocalizedValue(selectedProject.progressLabel, i18n.language, "")}</small>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container main-content">
        <section className="toolbar">
          <div className="search-box">
            <label htmlFor="search">{t("searchLabel")}</label>
            <input
              id="search"
              type="text"
              placeholder={t("searchPlaceholder")}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="filters">
            <span>{t("category")}</span>
            <div className="filter-pills">
              {categoryOptions.map((item) => (
                <button
                  key={item.key}
                  className={category === item.key ? "active" : ""}
                  onClick={() => setCategory(item.key)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="dashboard-panel chart-panel">
            <div className="panel-header">
              <h2>{t("progressComparison")}</h2>
              <p>{t("progressNote")}</p>
            </div>

            <div className="compare-list">
              {numericProjects.map((project) => (
                <div className="compare-item" key={project.id}>
                  <div className="compare-top">
                    <span>
                      {project.icon} {getLocalizedValue(project.name, i18n.language, "")}
                    </span>
                    <strong>{getLocalizedValue(project.progressLabel, i18n.language, "")}</strong>
                  </div>
                  <div className="bar">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${project.progress}%`,
                        background: project.gradient
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-panel map-panel">
            <div className="panel-header">
              <h2>{t("interactiveMap")}</h2>
              <p>{t("mapNote")}</p>
            </div>

            <MapView
              projects={filteredProjects}
              selectedId={selectedProject?.id}
              onSelect={setSelectedId}
            />
          </div>
        </section>

        <ChartsPanel projects={filteredProjects} />

        <section className="projects-section">
          <div className="section-head">
            <h2>{t("projectCards")}</h2>
            <p>{t("projectCardsNote")}</p>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="empty-state">{t("noResults")}</div>
          ) : (
            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  selected={selectedProject?.id === project.id}
                  onSelect={setSelectedId}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

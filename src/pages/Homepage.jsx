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

const VIDEO_WATCH_URL = "https://www.youtube.com/watch?v=xJ7a6yazmkU";
const VIDEO_EMBED_URL = "https://www.youtube-nocookie.com/embed/xJ7a6yazmkU?rel=0";
const projectCardId = (projectId) => `project-card-${projectId}`;

export default function Homepage() {
  const { t, i18n } = useTranslation();
  const [customProjects, setCustomProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [chartCategory, setChartCategory] = useState("");
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
    ? Math.round(
        numericProjects.reduce((sum, project) => sum + project.progress, 0) /
          numericProjects.length
      )
    : 0;
  const completedCount = filteredProjects.filter((project) => project.progress === 100).length;
  const inProgressCount = filteredProjects.filter(
    (project) => typeof project.progress === "number" && project.progress < 100
  ).length;
  const positiveImpactCount = filteredProjects.reduce(
    (sum, project) => sum + project.positiveImpacts.length,
    0
  );

  const featuredProjects = filteredProjects.slice(0, 3);

  function scrollToProjectCard(projectId) {
    setSelectedId(projectId);

    window.setTimeout(() => {
      const cardElement = document.getElementById(projectCardId(projectId));
      if (cardElement) {
        cardElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 80);
  }

  function focusProjectOnMap(projectId) {
    setSelectedId(projectId);

    window.setTimeout(() => {
      const mapElement = document.getElementById("interactive-map-panel");
      if (mapElement) {
        mapElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 80);
  }

  return (
    <div className="app-shell">
      <div className="container top-utility-bar">
        <div className="top-credit-badge">
          <span className="top-credit-badge__label">
            {i18n.language === "ar" ? "تصميم وتطوير" : "Designed and Developed by"}
          </span>
          <strong>{i18n.language === "ar" ? "الوليد بن نوح" : "ALWALEED BIN NOUH"}</strong>
          <div className="top-credit-badge__contacts">
            <a href="mailto:alwaleednu@gmail.com" className="top-credit-link">
              alwaleednu@gmail.com
            </a>
            <span>|</span>
            <a
              href="https://www.linkedin.com/in/alwaleed-bin-nouh-/"
              className="top-credit-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <LanguageSwitcher />
      </div>

      <header className="hero">
        <div className="hero__overlay" />

        <div className="container hero__content hero__content--immersive">
          <div className="hero__text hero__text--premium">
            <div className="top-line">
              <span className="hero-badge">{t("interactiveDashboard")}</span>

              <div className="hero-actions">
                <button
                  className="theme-toggle"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? t("light") : t("dark")}
                </button>
                <Link to="/login" className="hero-link-button">
                  {t("adminLogin")}
                </Link>
              </div>
            </div>

            <div className="hero-copy">
              <span className="hero-eyebrow">{t("capitalDashboard")}</span>
              <h1>{t("riyadhProjects")}</h1>
              <p>{t("description")}</p>
            </div>

            <div className="hero-highlight-strip">
              <div className="hero-highlight-card">
                <span>{t("deliveryReadiness")}</span>
                <strong>{averageProgress}%</strong>
              </div>
              <div className="hero-highlight-card">
                <span>{t("activePrograms")}</span>
                <strong>{filteredProjects.length}</strong>
              </div>
              <div className="hero-highlight-card">
                <span>{t("cityImpact")}</span>
                <strong>{positiveImpactCount}</strong>
              </div>
            </div>

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

          <aside className="hero-media-stack">
            <div className="hero__glass video-panel">
              <div className="panel-header panel-header--tight">
                <h2>{t("videoSectionTitle")}</h2>
                <p>{t("videoSectionNote")}</p>
              </div>

              <div className="video-frame">
                <iframe
                  src={VIDEO_EMBED_URL}
                  title={t("videoSectionTitle")}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              <div className="video-actions">
                <a
                  className="hero-link-button video-link-button"
                  href={VIDEO_WATCH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("openVideoDirectly")}
                </a>
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
          </aside>
        </div>
      </header>

      <main className="container main-content">
        <section className="executive-strip">
          <div className="section-head section-head--compact">
            <h2>{t("featuredProjectsTitle")}</h2>
            <p>{t("featuredProjectsNote")}</p>
          </div>

          <div className="executive-grid">
            {featuredProjects.map((project) => (
              <button
                key={project.id}
                type="button"
                className={`executive-card ${selectedProject?.id === project.id ? "active" : ""}`}
                onClick={() => scrollToProjectCard(project.id)}
              >
                <span className="executive-card__meta">
                  {project.icon} {getLocalizedValue(project.category, i18n.language, "")}
                </span>
                <strong>{getLocalizedValue(project.name, i18n.language, "")}</strong>
                <small>{getLocalizedValue(project.progressLabel, i18n.language, "")}</small>
              </button>
            ))}
          </div>
        </section>

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
                <button
                  type="button"
                  className={`compare-item compare-item-button ${
                    selectedProject?.id === project.id ? "active" : ""
                  }`}
                  key={project.id}
                  onClick={() => focusProjectOnMap(project.id)}
                >
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
                </button>
              ))}
            </div>
          </div>

          <div className="dashboard-panel map-panel" id="interactive-map-panel">
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

        <ChartsPanel
          projects={filteredProjects}
          selectedId={selectedProject?.id}
          activeCategory={chartCategory}
          onProjectSelect={focusProjectOnMap}
          onCategoryChange={setChartCategory}
        />

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
                  cardId={projectCardId(project.id)}
                  project={project}
                  selected={selectedProject?.id === project.id}
                  onSelect={setSelectedId}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer footer--minimal">
        <div className="footer-content">
          <p>
            {i18n.language === "ar"
              ? "\u062a\u0635\u0645\u064a\u0645 \u062a\u062c\u0631\u064a\u0628\u064a 2026"
              : "Designed 2026"}
          </p>
          <p className="footer-meta-line">
            {i18n.language === "ar"
              ? "\u0647\u0630\u0647 \u0646\u0633\u062e\u0629 \u062a\u062c\u0631\u064a\u0628\u064a\u0629 \u0644\u0644\u0639\u0631\u0636 \u0648\u0627\u0644\u062a\u0637\u0648\u064a\u0631"
              : "This is an experimental build for preview and iteration"}
          </p>
        </div>
      </footer>
    </div>
  );
}

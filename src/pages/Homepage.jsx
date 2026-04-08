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
  const [mapSelectedId, setMapSelectedId] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const themeToggleLabel = theme === "dark" ? `☀ ${t("light")}` : `☾ ${t("dark")}`;

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

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 180);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    filteredProjects.find((project) => project.id === selectedId) ||
    filteredProjects[0] ||
    null;

  // Include Diriyah even if progress is not a number
  const numericProjects = filteredProjects.filter(
    (project) => typeof project.progress === "number"
  );
  const numericOrDiriyahProjects = filteredProjects.filter(
    (project) => typeof project.progress === "number" || project.id === "diriyah"
  );
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
  const selectedCategoryLabel =
    categoryOptions.find((item) => item.key === category)?.label || t("all");
  const hasActiveFilters = Boolean(search.trim()) || category !== "all";
  const mapFocusedProject =
    filteredProjects.find((project) => project.id === mapSelectedId) || selectedProject;
  const featuredProjects = filteredProjects.slice(0, 3);

  function scrollToProjectCard(projectId) {
    setSelectedId(projectId);
    setMapSelectedId(projectId);

    window.setTimeout(() => {
      const cardElement = document.getElementById(projectCardId(projectId));
      if (cardElement) {
        cardElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 80);
  }

  function focusProjectOnMap(projectId) {
    setMapSelectedId(projectId);
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
                  {themeToggleLabel}
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

        <section className="results-strip">
          <div className="results-strip__content">
            <div className="results-strip__lead">
              <span className="results-strip__eyebrow">
                {i18n.language === "ar" ? "ملخص الاستكشاف" : "Exploration Summary"}
              </span>
              <strong>
                {i18n.language === "ar"
                  ? `${filteredProjects.length} مشروع ظاهر الآن`
                  : `${filteredProjects.length} projects currently in view`}
              </strong>
              <p>
                {i18n.language === "ar"
                  ? "تابع حالة النتائج بسرعة، واعرف هل البحث أو التصنيف الحالي يؤثر على المعروض."
                  : "A quick pulse on what is visible right now and how your filters are shaping the view."}
              </p>
            </div>

            <div className="results-strip__stats">
              <div className="results-stat-card">
                <span>{i18n.language === "ar" ? "البحث الحالي" : "Search Term"}</span>
                <strong>{search.trim() || (i18n.language === "ar" ? "بدون" : "None")}</strong>
              </div>
              <div className="results-stat-card">
                <span>{i18n.language === "ar" ? "التصنيف" : "Category"}</span>
                <strong>{selectedCategoryLabel}</strong>
              </div>
              <div className="results-stat-card">
                <span>{i18n.language === "ar" ? "المشاريع المكتملة" : "Completed"}</span>
                <strong>{completedCount}</strong>
              </div>
            </div>
          </div>

          <div className="results-strip__actions">
            {hasActiveFilters ? (
              <button
                type="button"
                className="results-action-button"
                onClick={() => {
                  setSearch("");
                  setCategory("all");
                }}
              >
                {i18n.language === "ar" ? "إعادة ضبط الفلاتر" : "Reset Filters"}
              </button>
            ) : (
              <span className="results-status-pill">
                {i18n.language === "ar" ? "كل المشاريع ظاهرة" : "All projects visible"}
              </span>
            )}
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="dashboard-panel chart-panel">
            <div className="panel-header">
              <h2>{t("progressComparison")}</h2>
              <p>{t("progressNote")}</p>
            </div>

            <div className="compare-list">
              {numericOrDiriyahProjects.map((project) => (
                <button
                  type="button"
                  className={`compare-item compare-item-button ${
                    mapSelectedId === project.id ? "active" : ""
                  }`}
                  key={project.id}
                  onClick={() => focusProjectOnMap(project.id)}
                >
                  <div className="compare-top">
                    <span>
                      {project.icon} {getLocalizedValue(project.name, i18n.language, "")}
                    </span>
                    <strong>
                      {project.id === "diriyah"
                        ? getLocalizedValue(project.progressLabel, i18n.language, "")
                        : getLocalizedValue(project.progressLabel, i18n.language, "")}
                    </strong>
                  </div>
                  <div className="bar">
                    {typeof project.progress === "number" ? (
                      <div
                        className="bar-fill"
                        style={{
                          width: `${project.progress}%`,
                          background: project.gradient
                        }}
                      />
                    ) : null}
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

            {mapFocusedProject && (
              <div className="map-focus-banner">
                <div>
                  <span className="map-focus-banner__eyebrow">
                    {i18n.language === "ar" ? "المشروع المميز على الخريطة" : "Map Spotlight"}
                  </span>
                  <strong>
                    {mapFocusedProject.icon}{" "}
                    {getLocalizedValue(mapFocusedProject.name, i18n.language, "")}
                  </strong>
                  <p>
                    {getLocalizedValue(mapFocusedProject.locationType, i18n.language, "")}
                  </p>
                </div>
                <button
                  type="button"
                  className="results-action-button map-focus-banner__button"
                  onClick={() => scrollToProjectCard(mapFocusedProject.id)}
                >
                  {i18n.language === "ar" ? "فتح بطاقة المشروع" : "Open Project Card"}
                </button>
              </div>
            )}

            <MapView
              projects={filteredProjects}
              selectedId={mapSelectedId || selectedProject?.id}
              onSelect={(projectId) => {
                setSelectedId(projectId);
                setMapSelectedId(projectId);
              }}
            />
          </div>
        </section>

        <ChartsPanel
          projects={filteredProjects}
          selectedId={selectedProject?.id}
          activeCategory={chartCategory}
          onProjectSelect={scrollToProjectCard}
          onCategoryChange={setChartCategory}
        />

        <section className="projects-section">
          <div className="section-head">
            <h2>{t("projectCards")}</h2>
            <p>{t("projectCardsNote")}</p>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="empty-state empty-state--rich">
              <strong>{t("noResults")}</strong>
              <p>
                {i18n.language === "ar"
                  ? "جرّب حذف كلمة البحث أو إعادة التصنيف إلى الكل حتى تستعيد عرض المشاريع بالكامل."
                  : "Try clearing the search term or switching the category back to all to restore the full list."}
              </p>
              <button
                type="button"
                className="results-action-button"
                onClick={() => {
                  setSearch("");
                  setCategory("all");
                }}
              >
                {i18n.language === "ar" ? "استعادة كل المشاريع" : "Show All Projects"}
              </button>
            </div>
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

      <button
        type="button"
        className={`scroll-top-button ${showScrollTop ? "visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={i18n.language === "ar" ? "الرجوع إلى أعلى الصفحة" : "Back to top"}
      >
        ↑
      </button>
    </div>
  );
}


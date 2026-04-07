import React, { useEffect, useMemo, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { projects } from "./data/projects";
import ProjectCard from "./components/ProjectCard";
import MapView from "./components/MapView";

const categories = ["الكل", "نقل", "جودة حياة", "تطوير حضري", "بيئة", "تراث وسياحة"];


export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("الكل");
  const [selectedId, setSelectedId] = useState(projects[0].id);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const mapPanelId = "map-panel-section";

  // Scroll to map panel when a project is selected
  const handleSelectProject = (id) => {
    setSelectedId(id);
    // Try both documentElement and body for cross-browser compatibility
    setTimeout(() => {
      if (document.documentElement) {
        document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
      }
      if (document.body) {
        document.body.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 0);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const term = search.trim();
      const matchSearch =
        project.name.includes(term) ||
        project.summary.includes(term) ||
        project.category.includes(term);

      const matchCategory = category === "الكل" || project.category === category;
      return matchSearch && matchCategory;
    });
  }, [search, category]);

  const selectedProject =
    filteredProjects.find((p) => p.id === selectedId) || filteredProjects[0] || null;

  const numericProjects = filteredProjects.filter((p) => typeof p.progress === "number");

  const averageProgress = numericProjects.length
    ? Math.round(
        numericProjects.reduce((sum, p) => sum + p.progress, 0) / numericProjects.length
      )
    : 0;

  const completedCount = filteredProjects.filter((p) => p.progress === 100).length;

  const inProgressCount = filteredProjects.filter(
    (p) => typeof p.progress === "number" && p.progress < 100
  ).length;

  const positiveImpactCount = filteredProjects.reduce(
    (sum, p) => sum + p.positiveImpacts.length,
    0
  );

  return (
    <div className="app-shell">
      <footer className="footer">
        <div className="footer-content">
          <p>
            تم التنفيذ بواسطة <strong>الوليد بن نوح</strong> © 2026
          </p>

          <a href="mailto:alwaleednu@gmail.com" className="footer-link">
             alwaleednu@gmail.com | 🔗LinkedIn Profile 📧
          </a>

          
        </div>
      </footer>
      <header className="hero">
        <div className="hero__overlay" />

        <div className="container hero__content">
          <div className="hero__text">
            <div className="top-line">
              <span className="hero-badge">لوحة تفاعلية</span>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  className="theme-toggle"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? "☀️ لايت" : "🌙 دارك"}
                </button>
                <Link to="/login" style={{ padding: "8px 16px", background: "#3b82f6", color: "white", borderRadius: "6px", textDecoration: "none", cursor: "pointer" }}>
                  دخول إداري
                </Link>
              </div>
            </div>

            <h1>مشاريع الرياض</h1>
            <p>
              موقع تفاعلي يعرض نسبة الإنجاز، المتبقي، الآثار الإيجابية،
              والخريطة التفاعلية لمجموعة من مشاريع الرياض.
            </p>

            <div className="kpi-grid">
              <div className="kpi-card">
                <span>إجمالي المشاريع</span>
                <strong>{filteredProjects.length}</strong>
              </div>

              <div className="kpi-card">
                <span>متوسط التقدم</span>
                <strong>{averageProgress}%</strong>
              </div>

              <div className="kpi-card">
                <span>مشاريع مكتملة</span>
                <strong>{completedCount}</strong>
              </div>

              <div className="kpi-card">
                <span>مشاريع قيد التنفيذ</span>
                <strong>{inProgressCount}</strong>
              </div>

              <div className="kpi-card">
                <span>إجمالي الآثار الإيجابية</span>
                <strong>{positiveImpactCount}</strong>
              </div>
            </div>
          </div>

          <div className="hero__glass">
            <h2>ملخص سريع</h2>
            <p>
              بعض الأرقام رسمية، وبعضها مؤشرات متابعة أو حالات مرحلية،
              لذلك تم توضيح نوع كل نسبة داخل البطاقة.
            </p>

            {selectedProject && (
              <div className="hero-focus">
                <span>المشروع المحدد</span>
                <strong>{selectedProject.name}</strong>
                <small>{selectedProject.progressLabel}</small>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container main-content">
        <section className="toolbar">
          <div className="search-box">
            <label htmlFor="search">ابحث عن مشروع</label>
            <input
              id="search"
              type="text"
              placeholder="مثال: مترو، درعية، خضراء..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filters">
            <span>التصنيف</span>
            <div className="filter-pills">
              {categories.map((item) => (
                <button
                  key={item}
                  className={category === item ? "active" : ""}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="dashboard-panel chart-panel">
            <div className="panel-header">
              <h2>مقارنة التقدم</h2>
              <p>الأشرطة أدناه تمثل المشاريع ذات النسب الرقمية فقط.</p>
            </div>

            <div className="compare-list">
              {numericProjects.map((project) => (
                <div className="compare-item" key={project.id}>
                  <div className="compare-top">
                    <span>{project.icon} {project.name}</span>
                    <strong>{project.progressLabel}</strong>
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

          <div className="dashboard-panel map-panel" id={mapPanelId}>
            <div className="panel-header">
              <h2>الخريطة التفاعلية</h2>
              <p>اضغط على أي مشروع لإبرازه.</p>
            </div>

            <MapView
              projects={filteredProjects}
              selectedId={selectedProject?.id}
              onSelect={setSelectedId}
            />
          </div>
        </section>

        <section className="projects-section">
          <div className="section-head">
            <h2>بطاقات المشاريع</h2>
            <p>تحتوي على المحقق، المتبقي، المؤشرات، والآثار الإيجابية.</p>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="empty-state">لا توجد نتائج مطابقة.</div>
          ) : (
            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  selected={selectedProject?.id === project.id}
                  onSelect={handleSelectProject}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
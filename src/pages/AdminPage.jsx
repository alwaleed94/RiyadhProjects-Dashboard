import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { getStoredProjects, isLoggedIn, logout, saveStoredProjects } from "../lib/storage";

export default function AdminPage() {
  const [projects, setProjects] = useState(getStoredProjects());
  const [form, setForm] = useState({
    name: "",
    category: "",
    progress: "",
    impact: "",
    image: ""
  });

  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleAdd(e) {
    e.preventDefault();

    const newProject = {
      id: crypto.randomUUID(),
      name: form.name,
      category: form.category,
      progress: Number(form.progress),
      progressLabel: `${form.progress}%`,
      progressType: "target-indicator",
      status: Number(form.progress) === 100 ? "مكتمل" : "قيد التنفيذ",
      remaining: 100 - Number(form.progress),
      location: [24.7136, 46.6753],
      gradient: "linear-gradient(135deg, #0891b2, #7c3aed)",
      icon: "📍",
      image: form.image || null,
      summary: form.impact,
      achievedText: "تمت إضافة المشروع من لوحة التحكم.",
      remainingText: `المتبقي ${100 - Number(form.progress)}%`,
      positiveImpacts: [form.impact],
      metrics: [
        { label: "التقدم", value: `${form.progress}%` },
        { label: "المصدر", value: "لوحة التحكم" }
      ],
      sourceNote: "مدخل يدويًا من الأدمن"
    };

    const updated = [...projects, newProject];
    setProjects(updated);
    saveStoredProjects(updated);

    setForm({
      name: "",
      category: "",
      progress: "",
      impact: "",
      image: ""
    });
  }

  function handleLogout() {
    logout();
    window.location.href = "/";
  }

  function handleDelete(id) {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    saveStoredProjects(updated);
  }

  return (
    <div className="page-wrap">
      <div className="admin-card">
        <div className="admin-top">
          <h1>لوحة التحكم</h1>
          <button onClick={handleLogout}>تسجيل خروج</button>
        </div>

        <form className="admin-form" onSubmit={handleAdd}>
          <input name="name" placeholder="اسم المشروع" value={form.name} onChange={handleChange} required />
          <input name="category" placeholder="التصنيف" value={form.category} onChange={handleChange} required />
          <input name="progress" type="number" min="0" max="100" placeholder="نسبة الإنجاز" value={form.progress} onChange={handleChange} required />
          <textarea name="impact" placeholder="الأثر الإيجابي" value={form.impact} onChange={handleChange} required />
          <input name="image" type="url" placeholder="رابط الصورة (اختياري)" value={form.image} onChange={handleChange} />
          <button type="submit">إضافة مشروع</button>
        </form>

        <div className="admin-list">
          {projects.map((p) => (
            <div key={p.id} className="admin-item">
              <div style={{ flex: 1 }}>
                <strong>{p.name}</strong>
                <span>{p.category}</span>
                <span>{p.progress}%</span>
                {p.image && <span style={{ fontSize: '12px', color: '#22c55e' }}>📷 مع صورة</span>}
              </div>
              <button 
                onClick={() => handleDelete(p.id)} 
                style={{ background: "#ef4444", color: "white", padding: "6px 12px", borderRadius: "4px", border: "none", cursor: "pointer" }}
              >
                حذف
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
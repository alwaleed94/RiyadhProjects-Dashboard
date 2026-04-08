import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../lib/storage";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const navigate = useNavigate();
  const isArabic = document.documentElement.getAttribute("dir") === "rtl";
  const copy = {
    access: isArabic ? "بوابة الإدارة" : "Admin Access",
    dashboard: isArabic ? "لوحة مشاريع الرياض" : "Riyadh Projects Dashboard",
    title: isArabic ? "تسجيل الدخول الإداري" : "Administrative Sign In",
    intro: isArabic
      ? "واجهة دخول لإدارة المشاريع المخصصة وتحديث محتوى لوحة المتابعة بشكل مباشر"
      : "An access point for managing custom projects and updating dashboard content directly.",
    signIn: isArabic ? "تسجيل الدخول" : "Sign In",
    signInNote: isArabic
      ? "أدخل بياناتك للوصول إلى لوحة الإدارة."
      : "Enter your credentials to continue to the admin panel.",
    username: isArabic ? "اسم المستخدم" : "Username",
    password: isArabic ? "كلمة المرور" : "Password",
    submit: isArabic ? "دخول" : "Sign In",
    back: isArabic ? "العودة إلى الصفحة الرئيسية" : "Back to Homepage",
    error: isArabic ? "اسم المستخدم أو كلمة المرور غير صحيحة" : "Invalid username or password",
    light: "☀ Light Mode",
    dark: "☾ Dark Mode"
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!login(username, password)) {
      setError(copy.error);
      return;
    }

    navigate("/admin");
  }

  return (
    <div className="page-wrap auth-page">
      <div className="auth-layout">
        <section className="auth-hero-panel">
          <div className="auth-hero-panel__top">
            <span className="hero-badge">{copy.access}</span>
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? copy.light : copy.dark}
            </button>
          </div>

          <div className="auth-hero-panel__body">
            <span className="hero-eyebrow">{copy.dashboard}</span>
            <h1>{copy.title}</h1>
            <p>{copy.intro}</p>
          </div>
        </section>

        <form className="auth-card" onSubmit={handleSubmit}>
          <div className="auth-card__header">
            <h1>{copy.signIn}</h1>
            <p>{copy.signInNote}</p>
          </div>

          <input
            type="text"
            placeholder={copy.username}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <input
            type="password"
            placeholder={copy.password}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {error && <div className="error-box">{error}</div>}

          <button type="submit">{copy.submit}</button>

          <Link to="/" className="auth-back-link">
            {copy.back}
          </Link>
        </form>
      </div>
    </div>
  );
}

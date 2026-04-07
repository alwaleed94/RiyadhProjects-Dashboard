import React, { useState } from "react";
import { login } from "../lib/storage";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const ok = login(username, password);
    if (!ok) {
      setError("اسم المستخدم أو كلمة المرور غير صحيحة");
      return;
    }
    navigate("/admin");
  }

  return (
    <div className="page-wrap">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>تسجيل الدخول</h1>
        

        <input
          type="text"
          placeholder="اسم المستخدم"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="error-box">{error}</div>}

        <button type="submit">دخول</button>
      </form>
    </div>
  );
}
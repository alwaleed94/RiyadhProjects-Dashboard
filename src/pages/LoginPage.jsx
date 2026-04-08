import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../lib/storage";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (!login(username, password)) {
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
          onChange={(event) => setUsername(event.target.value)}
        />

        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {error && <div className="error-box">{error}</div>}

        <button type="submit">دخول</button>
      </form>
    </div>
  );
}

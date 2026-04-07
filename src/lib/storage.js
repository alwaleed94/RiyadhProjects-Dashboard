const PROJECTS_KEY = "riyadh_projects_custom";
const AUTH_KEY = "riyadh_admin_auth";

export function getStoredProjects() {
  const raw = localStorage.getItem(PROJECTS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveStoredProjects(projects) {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export function isLoggedIn() {
  return localStorage.getItem(AUTH_KEY) === "true";
}

export function login(username, password) {
  if (username === "admin" && password === "123456") {
    localStorage.setItem(AUTH_KEY, "true");
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}
// auth.js
import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token) {
  try {
    const { exp } = jwtDecode(token);
    if (!exp) return true;
    return Date.now() >= exp * 1000;
  } catch (e) {
    return true;
  }
}

export const authCheck = (navigate, location) => {
  const token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token");
    const redirectPath = location?.pathname || "/"; // ✅ safe fallback
    navigate("/login", { state: { from: redirectPath } });
  }
};

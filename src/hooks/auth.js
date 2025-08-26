export function isTokenExpired(token) {
  try {
    const { exp } = jwtDecode(token);
    if (!exp) return true;
    return Date.now() >= exp * 1000; // exp is in seconds
  } catch (e) {
    return true; // invalid token
  }
}
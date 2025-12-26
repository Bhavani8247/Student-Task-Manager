import API from "./api";

export const signup = data => API.post("/api/auth/signup", data);
export const login = data => API.post("/api/auth/login", data);

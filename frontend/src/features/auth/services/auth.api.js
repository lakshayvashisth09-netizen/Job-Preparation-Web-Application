import axios from "axios";

const api = axios.create({
  baseURL: "https://job-preparation-web-application.onrender.com",
  withCredentials: true,
});

export async function registerUser(userData) {
  try {
    const res = await api.post("/register", userData);
    return res.data;
  } catch (error) {
    throw error.response?.data || new Error("Network Error");
  }
}

export async function loginUser(credentials) {
  try {
    const res = await api.post("/login", credentials);
    return res.data;
  } catch (error) {
    throw error.response?.data || new Error("Network Error");
  }
}

export async function logoutUser() {
  try {
    const res = await api.get("/logout");
    return res.data;
  } catch (error) {
    throw error.response?.data || new Error("Network Error");
  }
}

export async function getMe() {
  try {
    const res = await api.get("/get-me");
    return res.data;
  } catch (error) {
    throw error.response?.data || new Error("Network Error");
  }
}
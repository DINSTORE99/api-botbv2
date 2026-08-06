// =====================================================
// IMPORT
// =====================================================

import axios from "axios";


// =====================================================
// API CONFIG
// =====================================================

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json"
  }
});


// =====================================================
// SERVER
// =====================================================

export const getStatus = async () => {
  const { data } = await API.get("/api/status");
  return data;
};

export const getHealth = async () => {
  const { data } = await API.get("/health");
  return data;
};


// =====================================================
// SESSION
// =====================================================

export const getSessions = async () => {
  const { data } = await API.get("/api/sessions");
  return data;
};

export const logoutSession = async (id) => {
  const { data } = await API.delete(`/api/logout/${id}`);
  return data;
};


// =====================================================
// PAIRING
// =====================================================

export const createPairing = async (number) => {
  const { data } = await API.post("/api/pair", {
    number
  });

  return data;
};

export const getPairingCode = async (sessionId) => {
  const { data } = await API.get(`/api/pairing/${sessionId}`);
  return data;
};


// =====================================================
// DEFAULT
// =====================================================

export default API;

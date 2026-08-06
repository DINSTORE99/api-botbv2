const BASE_URL = "";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}/api/${path}`, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Request gagal");
  }

  return data;
}

export const getStatus = () => request("status");

export const getSessions = () => request("sessions");

export const createPairing = (number) =>
  request("pairing", {
    method: "POST",
    body: JSON.stringify({ number })
  });

export const logoutSession = (sessionId) =>
  request("logout", {
    method: "POST",
    body: JSON.stringify({ sessionId })
  });

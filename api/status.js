export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method tidak diizinkan"
    });
  }

  try {
    const backendUrl = process.env.BACKEND_URL_API;

    if (!backendUrl) {
      return res.status(500).json({
        success: false,
        message: "BACKEND_URL_API belum diatur"
      });
    }

    const response = await fetch(
      `${backendUrl}/api/status`,
      {
        method: "GET",
        cache: "no-store"
      }
    );

    const data = await response.json();

    return res.status(response.status).json(data);

  } catch (error) {
    console.error("STATUS API ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Gagal menghubungi backend",
      error: error.message
    });
  }
}

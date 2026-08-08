export default async function handler(req, res) {
  try {
    const backendUrl = process.env.URL_BACKEND_API;

    if (!backendUrl) {
      return res.status(500).json({
        success: false,
        message: "URL_BACKEND_API belum diatur"
      });
    }

    const response = await fetch(
      `${backendUrl}/api/sessions`
    );

    const data = await response.json();

    return res.status(response.status).json(data);

  } catch (error) {
    console.error("SESSIONS API ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Backend tidak dapat dihubungi",
      error: error.message
    });
  }
}

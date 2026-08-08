export default async function handler(req, res) {
  try {
    const backendUrl = process.env.BACKEND_URL_API;

    const response = await fetch(`${backendUrl}/api/status`);

    const data = await response.json();

    return res.status(response.status).json(data);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      name: error.name,
      message: error.message,
      cause: error.cause
    });
  }
}

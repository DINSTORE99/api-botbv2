export default function handler(req, res) {
  res.status(200).json({
    URL_BACKEND_API: process.env.URL_BACKEND_API ?? "TIDAK ADA",
    NODE_ENV: process.env.NODE_ENV
  });
}

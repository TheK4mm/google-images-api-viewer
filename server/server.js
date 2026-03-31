const express = require("express");
const { getJson } = require("serpapi");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.get("/imagenes", async (req, res) => {
try {
const response = await getJson({
engine: "google_images",
q: req.query.q,
location: "Mexico",
google_domain: "google.com.mx",
hl: "es", gl: "mx", imgar: "w", imgsz: "m", safe: "active",
filter: "0",
api_key: process.env.SERP_API_KEY
});
res.json({ images_results: response.images_results });
} catch (error) {
console.error(error);
res.status(500).json({ error: "Error consultando SerpApi" });
}
});
app.listen(3000, () => {
console.log("Servidor corriendo en http://localhost:3000");
});
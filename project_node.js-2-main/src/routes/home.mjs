import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve home.html from /views folder
router.get("/", (req, res) => {
    const homePath = path.join(__dirname, "../views/home.html");
    res.sendFile(homePath);
});

export default router;

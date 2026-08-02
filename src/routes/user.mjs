import express from "express";
import db from "../database/db.mjs";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { username, password, email } = req.body;

        await db.run(
            "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
            [username, password, email]
        );

        res.status(200).json({ success: true, message: "User saved" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

export default router;

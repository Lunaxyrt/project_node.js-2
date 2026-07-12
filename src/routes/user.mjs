import express from "express";
import bcrypt from "bcrypt";
import db from "../database/db.mjs";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ error: "Missing fields" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(
            `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`,
            [username, hashedPassword, email],
            function (err) {
                if (err) {
                    console.error("DB error:", err.message);
                    return res.status(500).json({ error: "Database error" });
                }

                res.json({ message: "User registered successfully!" });
            }
        );
    } catch (error) {
        console.error("Hashing error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;

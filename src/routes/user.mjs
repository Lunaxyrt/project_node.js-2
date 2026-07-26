import express from "express";
import bcrypt from "bcrypt";
import db from "../database/db.mjs";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password, confirmPassword, email, confirmEmail } = req.body;

    // --- CHECK REQUIRED FIELDS ---
    if (!username || !password || !confirmPassword || !email || !confirmEmail) {
        return res.status(400).json({ error: "Missing fields" });
    }

    // --- VALIDATION ---
    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    if (email !== confirmEmail) {
        return res.status(400).json({ error: "Emails do not match" });
    }

    // --- CHECK IF USER EXISTS ---
    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, row) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (row) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // --- HASH PASSWORD ---
        const hashedPassword = await bcrypt.hash(password, 10);

        // --- INSERT USER ---
        db.run(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, hashedPassword],
            (err) => {
                if (err) {
                    return res.status(500).json({ error: "Failed to save user" });
                }
                return res.status(200).json({ message: "User saved to database" });
            }
        );
    });
});

export default router;

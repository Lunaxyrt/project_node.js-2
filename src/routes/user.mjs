import express from "express";
import { db } from "../database/db.mjs";
import { validateRegistration } from "../utils/validationSchemas.mjs";

const router = express.Router();

router.post("/register", (req, res) => {
    try {
        const errors = validateRegistration(req.body);

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ error: errors });
        }

        const { username, password, email } = req.body;

        db.run(
            `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`,
            [username, password, email],
            function (err) {
                if (err) {
                    return res.status(400).json({ error: err.message });
                }

                return res.json({ success: true, id: this.lastID });
            }
        );
    } catch (err) {
        console.error("SERVER ERROR:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

export default router;


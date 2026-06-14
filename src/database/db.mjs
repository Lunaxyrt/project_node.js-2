import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database will ALWAYS be created inside /src/database/
const dbPath = path.join(__dirname, "mydatabase.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("❌ DB connection error:", err.message);
    } else {
        console.log("✅ Connected to SQLite at", dbPath);
    }
});

export default function initDB() {
    db.run(
        `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            email TEXT NOT NULL
        )`,
        (err) => {
            if (err) {
                console.error("❌ Table creation error:", err.message);
            } else {
                console.log("✅ Users table ready");
            }
        }
    );
}

export { db };

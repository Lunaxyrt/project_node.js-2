import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.mjs";
import initDB from "./database/initDB.mjs";

const app = express();
const PORT = 3000;

// Initialize database
initDB();

// CORS
app.use(cors({
    origin: [
        "http://127.0.0.1:5500",
        "http://127.0.0.1:5501"
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files (HTML/CSS/JS)
app.use(express.static("src/views"));

// Routes
app.use("/api", userRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.mjs";
import initDB from "./database/initDB.mjs";

const app = express();
const PORT = 3000;

// Initialize DB
initDB();

// CORS
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

// Parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve ALL frontend files
app.use(express.static("src/views"));

// Registration page
app.get("/register", (req, res) => {
    res.sendFile("registrationpage.html", { root: "src/views" });
});

// Homepage
app.get("/home", (req, res) => {
    res.sendFile("home.html", { root: "src/views" });
});

// API routes
app.use("/api", userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
 

//http://127.0.0.1:3000/register

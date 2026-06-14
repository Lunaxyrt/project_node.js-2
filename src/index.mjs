import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.mjs";
import initDB from "./database/db.mjs";

const app = express();
const PORT = 3000;

// Allow frontend (127.0.0.1:5500) to access backend (localhost:3000)
app.use(cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

initDB();

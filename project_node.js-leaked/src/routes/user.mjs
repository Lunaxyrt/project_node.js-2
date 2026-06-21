import { registerSchema } from "./validationSchemas.mjs";

app.post("/register", async (req, res) => {
    const { error } = registerSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    res.json({ message: "OK" });
});

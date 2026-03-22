import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return res.status(400).json({ message: "Fill all fields" });

    if (await User.findOne({ email }))
        return res.status(400).json({ message: "Email exists" });

    const user = await User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
    });

    res.json({ message: "Register success", user });
});

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (!(await bcrypt.compare(password, user.password)))
        return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    res.json({ message: "Login success", token });
});

// Profile
router.get("/profile", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "No token" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        res.json(user);
    } catch {
        res.status(401).json({ message: "Unauthorized" });
    }
});

export default router;
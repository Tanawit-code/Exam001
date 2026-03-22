import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import dns from "dns";

dotenv.config(); // ✅ สำคัญมาก

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();
app.use(cors());
app.use(express.json());

const Test = mongoose.model("Test", { name: String });

// ✅ ใช้ชื่อให้ตรง .env
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(console.log);

// debug
console.log("MONGO_URI:", process.env.MONGO_URI);

app.get("/", (_, res) => res.send("API working"));

app.get("/test", async (_, res) => {
    await new Test({ name: "hello YOUYOUYOU" }).save();
    res.send("Inserted!");
});

app.listen(process.env.PORT || 5000);
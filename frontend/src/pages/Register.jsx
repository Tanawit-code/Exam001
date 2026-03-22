import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 👈 เพิ่ม

function Register() {
    const navigate = useNavigate(); // 👈 เพิ่ม

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/register",
                form
            );

            alert(res.data.message);

            navigate("/login"); // 👈 ไปหน้า Login (หรือ "/" ก็ได้)

        } catch (err) {
            alert(err.response?.data?.message || "Register failed");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>

            <input
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <br /><br />

            <input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <br /><br />

            <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <br /><br />

            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
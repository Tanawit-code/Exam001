import { useState } from "react";
import axios from "axios";

function Register() {
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

            setForm({
                name: "",
                email: "",
                password: "",
            });
        } catch (err) {
            alert(err.response?.data?.message || "Register failed");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>

            <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <br />
            <br />

            <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <br />
            <br />

            <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <br />
            <br />

            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
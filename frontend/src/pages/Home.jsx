import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        axios.get("http://localhost:5000/api/auth/profile", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => setUser(res.data))
            .catch(() => { });
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <div>
            <h1>Home</h1>

            {user ? (
                <>
                    <div>
                        <p>ยินดีต้อนรับคุณ<h2>{user.name}</h2> </p>
                        <button onClick={logout}>Logout</button>
                    </div>
                </>
            ) : (
                <p>ยังไม่ login</p>
            )}
        </div>
    );
}

export default Home;
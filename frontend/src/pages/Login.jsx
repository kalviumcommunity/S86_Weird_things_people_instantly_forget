import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const res = await fetch("http://localhost:5000/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: "include"
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || "Login failed");

            localStorage.setItem("token", data.token);
            // Store user data for later use
            localStorage.setItem("userData", JSON.stringify({
                userId: data.user._id,
                username: data.user.username
            }));
            setSuccess("Login successful!");

            // Redirect to Dashboard after successful login
            setTimeout(() => navigate("/forgotten"), 1500);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <button onClick={() => navigate("/signup")}>Sign up</button></p>
        </div>
    );
};

export default Login;
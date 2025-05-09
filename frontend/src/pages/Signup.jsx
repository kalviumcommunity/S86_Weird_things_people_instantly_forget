import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateForm = () => {
    const { username, email, password } = formData;

    // Name validation
    if (!username.trim()) return "Name is required.";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email format.";

    // Password validation
    if (password.length < 6) return "Password must be at least 6 characters long.";
    if (!/\d/.test(password)) return "Password must contain at least one number.";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";

    return null; // No errors
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear error state
    setSuccess(""); // Clear success state

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        // This is where you handle the backend error messages
        setError(data.msg || "Signup failed.");
        return;
      }

      setSuccess("User registered successfully! Please login.");
      setFormData({ username: "", email: "", password: "" }); // Reset the form data

      setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
    } catch (err) {
      setError(err.message); // Handle network or other unexpected errors
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Signup</button>
      </form>

      <p>Already have an account?</p>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
};

export default Signup;
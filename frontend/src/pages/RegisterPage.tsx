import React, { useState } from "react";
import { authApi } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    if (!email.trim() || !password.trim()) {
      setError("Email and password required");
      return;
    }
    setLoading(true);
    try {
      await authApi.register(email, password);
      setError(null);
      navigate("/login");
    } catch (err) {
      setError("Registration failed.");
      console.error("Registration failed: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <br />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <br />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </>
  );
};

export default RegisterPage;

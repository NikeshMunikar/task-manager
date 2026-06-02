import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!email.trim() || !password.trim()) {
      setError("Email and password required");
      return setLoading(false);
    }
    try {
      await login(email, password);
      setError(null);
      navigate("/tasks");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error("Login failed: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <h3>Login</h3>
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
          {loading ? "Loggin in..." : "Login"}
        </button>

        <button type="button" onClick={() => navigate("/register")}>
          Register
        </button>
      </form>
    </>
  );
};

export default LoginPage;

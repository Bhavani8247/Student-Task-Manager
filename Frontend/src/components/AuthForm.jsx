import { useState } from "react";
import "../index.css";

function AuthForm({ setAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !name)) {
      setError("All fields are required");
      return;
    }

    // TEMP login simulation (replace with API later)
    localStorage.setItem("token", "demo-token");
    setAuth(true);
  };

  return (
    <div className="auth-card-dark">
      <h2>{isLogin ? "Sign in" : "Create an account"}</h2>

      {!isLogin && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="auth-error">{error}</p>}

      <button className="btn-auth" onClick={handleSubmit}>
        {isLogin ? "Sign in" : "Create account"}
      </button>

      <p className="switch-text">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button
          className="link-button"
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
          }}
        >
          {isLogin ? " Sign up" : " Sign in"}
        </button>
      </p>
    </div>
  );
}

export default AuthForm;

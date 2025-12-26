// Frontend/src/components/AuthForm.jsx
import { useState } from "react";

function AuthForm({ setAuth }) {
  const [mode, setMode] = useState("signup");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = { firstName, lastName, email };
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", "demo-token");

    setAuth(true); // switch to task page
  };

  return (
    <div className="auth-modal">
      <div className="auth-card-dark">
        <div className="auth-tabs">
          <button
            type="button"
            className={mode === "signup" ? "active" : ""}
            onClick={() => setMode("signup")}
          >
            Sign up
          </button>
          <button
            type="button"
            className={mode === "signin" ? "active" : ""}
            onClick={() => setMode("signin")}
          >
            Sign in
          </button>
        </div>

        <h2>{mode === "signup" ? "Create an account" : "Welcome back"}</h2>

        <form onSubmit={handleSubmit}>
          {mode === "signup" && (
            <div className="name-row">
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          )}

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn-auth" type="submit">
            {mode === "signup" ? "Create an account" : "Sign in"}
          </button>
        </form>

        <div className="divider">OR SIGN IN WITH</div>

        <div className="social-row">
          <button className="social-btn google">Google</button>
          <button className="social-btn apple">Apple</button>
        </div>

        <p className="terms">
          By continuing, you agree to our Terms &amp; Service
        </p>
      </div>
    </div>
  );
}

export default AuthForm;

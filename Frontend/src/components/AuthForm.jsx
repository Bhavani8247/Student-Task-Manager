import { useState } from "react";
import { login, signup } from "../services/auth";

export default function AuthForm({ setAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async e => {
    e.preventDefault();
    const res = isLogin ? await login(form) : await signup(form);
    localStorage.setItem("token", res.data.token);
    setAuth(true);
  };

  return (
    <form onSubmit={submit}>
      {!isLogin && (
        <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      )}
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password"
        onChange={e => setForm({ ...form, password: e.target.value })} />
      <button>{isLogin ? "Login" : "Signup"}</button>
      <p onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? "Signup" : "Login"}
      </p>
    </form>
  );
}

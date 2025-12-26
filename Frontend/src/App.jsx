// Frontend/src/App.jsx
import { useState } from "react";
import AuthForm from "./components/AuthForm";

function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem("token"));

  if (!auth) {
    return (
      <div className="auth-overlay">
        <AuthForm setAuth={setAuth} />
      </div>
    );
  }

  // After signup/login
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="app-root">
      <main className="app-main">
        <div className="card">
          <h2>Welcome, {user.firstName || "User"}</h2>
          <p>This is where your Task Manager UI (AddTaskForm, TaskList) goes.</p>
        </div>
      </main>
    </div>
  );
}

export default App;

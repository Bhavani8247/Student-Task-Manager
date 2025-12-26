import { useState } from "react";
import AuthForm from "./components/AuthForm";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem("token"));

  return auth ? (
    <>
      <AddTaskForm refresh={() => window.location.reload()} />
      <TaskList />
    </>
  ) : (
    <div className="auth-overlay">
      <div className="auth-modal">
        <AuthForm setAuth={setAuth} />
      </div>
    </div>
  );
}

export default App;

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
    <AuthForm setAuth={setAuth} />
  );
}

export default App;

import { useState } from "react";
import { createTask } from "../services/api";


export default function AddTaskForm({ refresh }) {
  const [title, setTitle] = useState("");

  const add = async e => {
    e.preventDefault();
    await createTask({ title });
    setTitle("");
    refresh();
  };

  return (
    <form onSubmit={add}>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button>Add</button>
    </form>
  );
}

import { useEffect, useState } from "react";
import { getTasks, updateTask, deleteTask } from "../services/api";


export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  const load = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => { load(); }, []);

  return (
    <ul>
      {tasks.map(t => (
        <li key={t._id}>
          {t.title}
          <button onClick={() => deleteTask(t._id).then(load)}>X</button>
        </li>
      ))}
    </ul>
  );
}

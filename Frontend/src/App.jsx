import { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import Header from './components/Header';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import NotFound from './components/NotFound';
import { fetchTasks, createTask, updateTask, deleteTask } from './services/api';
import { getToken, logout, getUser } from './services/auth';

const App = () => {
  const [isAuthed, setIsAuthed] = useState(!!getToken());
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    sort: 'createdAt',
    search: ''
  });
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState('');

  useEffect(() => {
    if (!isAuthed) return;
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchTasks(filters);
        setTasks(data);
      } catch (err) {
        if (err.message === 'Unauthorized') {
          logout();
          setIsAuthed(false);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [isAuthed, filters]);

  const handleAdd = async (task) => {
    const saved = await createTask(task);
    setTasks((prev) => [saved, ...prev]);
    setNotify('Task added successfully');
  };

  const handleUpdate = async (id, updates) => {
    const updated = await updateTask(id, updates);
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    setNotify('Task updated');
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
    setNotify('Task deleted');
  };

  if (!isAuthed) {
    return <AuthForm onAuth={() => setIsAuthed(true)} />;
  }

  return (
    <div className="app-root">
      <Header
        user={getUser()}
        onLogout={() => {
          logout();
          setIsAuthed(false);
        }}
        notify={notify}
        clearNotify={() => setNotify('')}
      />
      <main className="app-main">
        <section className="app-left">
          <AddTaskForm onAddTask={handleAdd} />
        </section>
        <section className="app-right">
          <FilterBar filters={filters} onFiltersChange={setFilters} />
          {loading ? (
            <p className="center-text">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <NotFound />
          ) : (
            <TaskList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />
          )}
        </section>
      </main>
    </div>
  );
};

export default App;

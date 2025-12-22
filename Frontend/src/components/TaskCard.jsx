import { useState } from 'react';
import EditModal from './EditModal';

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);

  const toggleComplete = () => {
    onUpdate(task._id, { completed: !task.completed });
  };

  const handleSave = (updates) => {
    onUpdate(task._id, updates);
    setEditing(false);
  };

  const isOverdue =
    task.dueDate && !task.completed && new Date(task.dueDate) < new Date();

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }) : '';

  const priorityClass =
    task.priority === 'high'
      ? 'badge badge-high'
      : task.priority === 'low'
      ? 'badge badge-low'
      : 'badge badge-medium';

  return (
    <>
      <div className={`task-card ${task.completed ? 'task-completed' : ''}`}>
        <div className="task-main">
          <div className="task-header">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={toggleComplete}
            />
            <h3>{task.title}</h3>
          </div>

          {task.description && (
            <p className="task-desc">{task.description}</p>
          )}

          <div className="task-meta">
            <span className={priorityClass}>
              {task.priority?.toUpperCase() || 'MEDIUM'}
            </span>
            {task.dueDate && (
              <span className="badge badge-date">
                Due: {formatDate(task.dueDate)}
              </span>
            )}
            <span className="badge badge-status">
              {task.completed ? 'Completed' : 'Pending'}
            </span>
            {isOverdue && (
              <span className="badge badge-overdue">
                Overdue
              </span>
            )}
          </div>
        </div>

        <div className="task-actions">
          <button
            className="btn-small"
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
          <button
            className="btn-small btn-danger"
            onClick={() => onDelete(task._id)}
          >
            Delete
          </button>
        </div>
      </div>

      <EditModal
        open={editing}
        task={task}
        onClose={() => setEditing(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default TaskCard;

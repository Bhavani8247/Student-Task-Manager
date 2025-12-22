import TaskCard from './TaskCard';

const TaskList = ({ tasks, onUpdate, onDelete }) => {
  if (!tasks.length) {
    return <div className="empty">No tasks yet. Add your first task above.</div>;
  }
  return (
    <div className="task-list">
      {tasks.map((t) => (
        <TaskCard
          key={t._id}
          task={t}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;

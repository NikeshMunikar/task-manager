import { useState, useEffect } from "react";
import { taskApi, type Task } from "../api/task.api";
import { useAuth } from "../context/AuthContext";
import "./TaskPage.css";

const TasksPage = () => {
  const { logout } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await taskApi.getTasks();
        setTasks(data.tasks);
      } catch (err) {
        setError("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return (
    <>
      <button
        style={{
          width: "fit-content",
          margin: "10px 10px 10px auto",
        }}
        onClick={logout}
      >
        Logout
      </button>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!loading && tasks.length === 0 && (
        <div>
          <h3>You don't have any tasks yet.</h3>
          <p>Create one below.</p>
        </div>
      )}
      <div className="task-container">
      <h3>Task List</h3>
      {tasks.map((t) => (
        <div className="task-card" key={t.id}>
          {editingId === t.id ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <input
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
              <button
                onClick={async () => {
                  try {
                    if (!editTitle.trim()) {
                      setError("Title cannot be empty");
                      return;
                    }
                    const data = await taskApi.updateTask(
                      t.id,
                      editTitle,
                      editDescription,
                      t.completed,
                    );
                    setTasks((prev) =>
                      prev.map((task) => (task.id === t.id ? data.task : task)),
                    );
                    setEditingId(null);
                  } catch {
                    setError("Failed to update Task");
                  }
                }}
              >
                Save
              </button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <h3
                style={{
                  opacity: t.completed ? 0.4 : 1,
                  textDecoration: t.completed ? "line-through" : "none",
                }}
              >
                {t.title}
              </h3>
              {t.description && (
                <p style={{ display: t.completed ? "none" : "block" }}>
                  {t.description}
                </p>
              )}

              <div className="task-actions">
              <button
                onClick={async () => {
                  try {
                    const data = await taskApi.updateTask(
                      t.id,
                      t.title,
                      t.description,
                      !t.completed,
                    );

                    setTasks((prev) =>
                      prev.map((task) => (task.id === t.id ? data.task : task)),
                    );
                  } catch {
                    setError("Failed to update task");
                  }
                }}
              >
                {t.completed ? "Incomplete" : "Complete"}
              </button>

              <button
                onClick={() => {
                  setEditingId(t.id);
                  setEditTitle(t.title);
                  setEditDescription(t.description || "");
                  setError(null);
                }}
              >
                Edit
              </button>

              <button
                onClick={async () => {
                  if (!window.confirm("Delete this task?")) return;
                  try {
                    await taskApi.deleteTask(t.id);
                    setTasks((prev) => prev.filter((task) => task.id !== t.id));
                  } catch {
                    setError("Failed to delete task");
                  }
                }}
              >
                Delete
              </button>
              </div>

            </>
          )}
        </div>
      ))}
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          try {
            if (!title.trim()) {
              setError("Title cannot be empty");
              return;
            }

            const data = await taskApi.createTask(title, description);
            setTasks((prev) => [...prev, data.task]);
            setTitle("");
            setDescription("");
          } catch (err) {
            setError("Failed to create task");
          }
        }}
      >
        <br />
        Title:{" "}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <br />
        <br />
        Description:{" "}
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <br />
        <br />
        <button type="submit">Create Task</button>
      </form>
    </>
  );
};

export default TasksPage;

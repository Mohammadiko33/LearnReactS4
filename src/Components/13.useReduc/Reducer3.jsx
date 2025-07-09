import { useReducer, useState } from "react";

function todoReducer(state, action) {
  switch (action.type) {
    case "add":
      return [
        ...state,
        { id: Date.now(), text: action.text, completed: false },
      ];
    case "toggle":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case "delete":
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
}

export default function TodoList({ showReducer1 }) {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch({ type: "add", text });
      setText("");
    }
  };

  const styles = {
    container: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      maxWidth: "500px",
      margin: "30px auto",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
      backgroundColor: "#ffffff",
    },
    title: {
      color: "#2c3e50",
      textAlign: "center",
      marginBottom: "25px",
    },
    form: {
      display: "flex",
      marginBottom: "20px",
    },
    input: {
      flex: "1",
      padding: "10px 15px",
      border: "1px solid #ddd",
      borderRadius: "4px 0 0 4px",
      fontSize: "16px",
      outline: "none",
      "&:focus": {
        borderColor: "#3498db",
      },
    },
    addButton: {
      padding: "10px 20px",
      backgroundColor: "#3498db",
      color: "white",
      border: "none",
      borderRadius: "0 4px 4px 0",
      cursor: "pointer",
      fontSize: "16px",
      transition: "background-color 0.3s",
      "&:hover": {
        backgroundColor: "#2980b9",
      },
    },
    todoList: {
      listStyle: "none",
      padding: "0",
    },
    todoItem: {
      display: "flex",
      alignItems: "center",
      padding: "12px 15px",
      marginBottom: "8px",
      backgroundColor: "#f8f9fa",
      borderRadius: "4px",
      transition: "all 0.3s",
    },
    todoText: {
      flex: "1",
      margin: "0 15px",
      cursor: "pointer",
    },
    completed: {
      textDecoration: "line-through",
      color: "#95a5a6",
    },
    deleteButton: {
      padding: "5px 10px",
      backgroundColor: "#e74c3c",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background-color 0.3s",
      "&:hover": {
        backgroundColor: "#c0392b",
      },
    },
    emptyState: {
      textAlign: "center",
      color: "#7f8c8d",
      fontStyle: "italic",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Todo List</h2>

      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          style={styles.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
        />
        <button style={styles.addButton} type="submit">
          Add
        </button>
      </form>

      <ul style={styles.todoList}>
        {todos.length === 0 ? (
          <p style={styles.emptyState}>No tasks yet. Add one above!</p>
        ) : (
          todos.map((todo) => (
            <li key={todo.id} style={styles.todoItem}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch({ type: "toggle", id: todo.id })}
              />
              <span
                style={{
                  ...styles.todoText,
                  ...(todo.completed && styles.completed),
                }}
                onClick={() => dispatch({ type: "toggle", id: todo.id })}
              >
                {todo.text}
              </span>
              <button
                style={styles.deleteButton}
                onClick={() => dispatch({ type: "delete", id: todo.id })}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>

      <button className="re" onClick={showReducer1}>
        Next TesT
      </button>
    </div>
  );
}

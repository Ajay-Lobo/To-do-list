import { useState, useEffect } from "react";

const Todo = () => {
  // Save in local storage
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  // State for storing new todo items
  const [todo, setTodo] = useState("");

  // Input handle change
  const handleInput = (e) => {
    setTodo(e.target.value);
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.trim() === "") {
      return;
    }
    setTodos([...todos, todo]);
    setTodo("");
  };

  // Save to local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div>
      <h1>My To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a to-do"
          value={todo}
          onChange={handleInput}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button
              onClick={() => {
                const newTodos = todos.filter((_, i) => i !== index);
                setTodos(newTodos);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;

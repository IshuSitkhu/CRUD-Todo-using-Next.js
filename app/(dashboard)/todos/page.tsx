"use client";

import { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  // Fetch todos from API
 useEffect(() => {
  // MOCK DATA until API is ready
  const mockTodos = [
    { id: 1, title: "Learn Next.js", completed: false },
    { id: 2, title: "Build Todo App", completed: true },
  ];
  setTodos(mockTodos);

  // Uncomment this when API is ready
  // fetch("/api/todos")
  //   .then((res) => res.json())
  //   .then(setTodos)
  //   .catch((err) => console.error(err));
}, []);


  // Add new todo
  const addTodo = async () => {
    if (!title) return;
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: { "Content-Type": "application/json" },
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setTitle("");
  };

  // Delete todo
  const deleteTodo = async (id: number) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Todos</h1>

      {/* Add Todo Form */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add new todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 flex-1"
        />
        <button
          onClick={addTodo}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* Todos List */}
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span className={todo.completed ? "line-through text-gray-500" : ""}>
              {todo.title}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

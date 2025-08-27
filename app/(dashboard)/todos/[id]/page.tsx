"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function TodoPage() {
  const params = useParams(); // get dynamic [id] from URL
  const todoId = params.id;   // string
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState(todo?.title || "");
const [completed, setCompleted] = useState(todo?.completed || false);

  useEffect(() => {
    if (!todoId) return;

    fetch(`/api/todosdb/${todoId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Todo not found");
        return res.json();
      })
      .then((data) => setTodo(data))
      .catch((err) => {
        console.error(err);
        setTodo(null);
      })
      .finally(() => setLoading(false));//to indicate the fetch is complete.
  }, [todoId]);
  //runs whenever todoId changes.

  const deleteTodo = async () => {
  if (!todoId) return;

  try {
    const res = await fetch(`/api/todosdb/${todoId}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete");
    
    alert("Todo deleted successfully");
    // Redirect user back to todos list after deletion
    window.location.href = "/todos"; 
  } catch (err) {
    console.error(err);
    alert("Error deleting todo");
  }
};

const updateTodo = async () => {
  if (!todoId) return;

  try {
    const res = await fetch(`/api/todosdb/${todoId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed }),
    });

    if (!res.ok) throw new Error("Failed to update");

    const updatedTodo = await res.json();// convert response to JSON
    setTodo(updatedTodo);
    alert("Todo updated successfully");
  } catch (err) {
    console.error(err);
    alert("Error updating todo");
  }
};

  if (loading) return <p className="p-4">Loading...</p>;
  if (!todo) return <p className="p-4 text-red-500">Todo not found</p>;

  return (
    <div className="p-4 border rounded shadow-md max-w-md mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Todo Details</h1>
      <div className="mt-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <label className="block mb-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="mr-2"
        />
        Completed
      </label>
      <button onClick={updateTodo} className="bg-green-600 text-white px-4 py-2 rounded mr-2">
        Update
      </button>
      <button onClick={deleteTodo} className="bg-red-600 text-white px-4 py-2 rounded">
        Delete
      </button>
</div>

      <p><strong>ID:</strong> {todo.id}</p>
      <p><strong>Title:</strong> {todo.title}</p>
      <p>
        <strong>Completed:</strong>{" "}
        {todo.completed ? "✅ Completed" : "❌ Not Completed"}
      </p>
    </div>
  );
}

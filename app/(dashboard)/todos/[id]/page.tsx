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

  if (loading) return <p className="p-4">Loading...</p>;
  if (!todo) return <p className="p-4 text-red-500">Todo not found</p>;

  return (
    <div className="p-4 border rounded shadow-md max-w-md mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Todo Details</h1>
      <p><strong>ID:</strong> {todo.id}</p>
      <p><strong>Title:</strong> {todo.title}</p>
      <p>
        <strong>Completed:</strong>{" "}
        {todo.completed ? "✅ Completed" : "❌ Not Completed"}
      </p>
    </div>
  );
}

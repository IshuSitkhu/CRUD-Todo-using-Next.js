// "use client";

// import { useEffect, useState } from "react";

// interface Todo {
//   id: number;
//   title: string;
//   completed: boolean;
// }

// export default function TodosPage() {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [title, setTitle] = useState("");

//   // Fetch todos from API
//  useEffect(() => {
//   // MOCK DATA until API is ready
//   const mockTodos = [
//     { id: 1, title: "Learn Next.js", completed: false },
//     { id: 2, title: "Build Todo App", completed: true },
//   ];
//   setTodos(mockTodos);

//   // Uncomment this when API is ready
//   // fetch("/api/todos")
//   //   .then((res) => res.json())
//   //   .then(setTodos)
//   //   .catch((err) => console.error(err));
// }, []);


//   // Add new todo
//   const addTodo = async () => {
//     if (!title) return;
//     const res = await fetch("/api/todos", {
//       method: "POST",
//       body: JSON.stringify({ title }),
//       headers: { "Content-Type": "application/json" },
//     });
//     const newTodo = await res.json();
//     setTodos([...todos, newTodo]);
//     setTitle("");
//   };

//   // Delete todo
//   const deleteTodo = async (id: number) => {
//     await fetch(`/api/todos/${id}`, { method: "DELETE" });
//     setTodos(todos.filter((t) => t.id !== id));
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Todos</h1>

//       {/* Add Todo Form */}
//       <div className="flex gap-2 mb-4">
//         <input
//           type="text"
//           placeholder="Add new todo"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="border p-2 flex-1"
//         />
//         <button
//           onClick={addTodo}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Add
//         </button>
//       </div>

//       {/* Todos List */}
//       <ul className="space-y-2">
//         {todos.map((todo) => (
//           <li
//             key={todo.id}
//             className="flex justify-between items-center border p-2 rounded"
//           >
//             <span className={todo.completed ? "line-through text-gray-500" : ""}>
//               {todo.title}
//             </span>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => deleteTodo(todo.id)}
//                 className="text-red-500 hover:underline"
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  taskCode?: string; // ? means: Optional because user may not provide it

}//An interface is a way to describe the shape (structure) of an object.

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  //<Todo[]> means todos is an array of objects, and each object must follow the Todo interface.

  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState("");
  const [taskCode, setTaskCode] = useState("");

  // Fetch todos from API
  useEffect(() => {
    fetch("/api/todosdb") //HTTP GET request to your backend endpoint /api/todosdb.
      .then((res) => res.json())//convert the response to JSON format.
      .then((data) => setTodos(data)) //Updates the todos state with the fetched data.
      .catch((err) => console.error(err));
  }, []);

  // Add new todo
  const addTodo = async () => {
  if (!title) return;
  try {
    const res = await fetch("/api/todosdb", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, taskCode }),
    }); //sends new todo data to the backend.

    const data = await res.json(); //converts the backend response to an object.
    if (res.ok) {
      setTodos([...todos, data]); //adds the new todo to the existing todos array.
      setTitle("");//clear the input fields.
      setTaskCode("");
    } else {
      alert(data.error);
    }
  } catch (err) {
    console.error("Failed to add todo:", err);
  }
};


  // Delete todo
  const deleteTodo = async (id: number) => {
    try {
      await fetch(`/api/todosdb/${id}`, { method: "DELETE" });//DELETE request to /api/todosdb/{id}
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todos</h1>

      {/* Add Todo Form */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Custom Task Code (optional)"
          value={taskCode}
          onChange={(e) => setTaskCode(e.target.value)}
          className="border p-2 flex-1"
        />
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
              {todo.id} -
              {todo.title}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { NextRequest, NextResponse } from "next/server";

// In-memory "database"
let todos = [
  { id: 1, title: "Learn Next.js", completed: false },
  { id: 2, title: "Build Todo App", completed: true },
];

export async function GET() {
  // Return all todos
  return NextResponse.json(todos);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.title) return NextResponse.json({ error: "Title is required" }, { status: 400 });

  const newTodo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    title: body.title,
    completed: false,
  };
  todos.push(newTodo);

  return NextResponse.json(newTodo, { status: 201 });
}

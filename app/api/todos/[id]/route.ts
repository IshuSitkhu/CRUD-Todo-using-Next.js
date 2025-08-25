import { NextRequest, NextResponse } from "next/server";

// Reuse same in-memory array
let todos = [
  { id: 1, title: "Learn Next.js", completed: false },
  { id: 2, title: "Build Todo App", completed: true },
];

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  return NextResponse.json(todo);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const body = await req.json();

  const todo = todos.find(t => t.id === id);
  if (!todo) return NextResponse.json({ error: "Todo not found" }, { status: 404 });

  // Update title/completed if provided
  if (body.title !== undefined) todo.title = body.title;
  if (body.completed !== undefined) todo.completed = body.completed;

  return NextResponse.json(todo);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return NextResponse.json({ error: "Todo not found" }, { status: 404 });

  todos.splice(index, 1);
  return NextResponse.json({ message: "Todo deleted successfully" });
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all todos
export async function GET() {
  try {
    const todos = await prisma.todo.findMany({ orderBy: { id: "asc" } });
    return NextResponse.json(todos);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
  }
}

/**
 * ->Fetch all todos from the database.
 * prisma.todo.findMany() → gets all todos in ascending order by id.
 * Returns the todos as a JSON response to the client (frontend).
 */

// POST new todo
export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); //Reads the JSON data sent from the client (frontend) in the request body.
    if (!body.title) return NextResponse.json({ error: "Title is required" }, { status: 400 });

   const newTodo = await prisma.todo.create({
      data: {
        title: body.title,
      },
    });

    return NextResponse.json(newTodo, { status: 201 });
  } catch (err: any) {
    if (err.code === "P2002") { // Prisma unique constraint violation
      return NextResponse.json({ error: "Task Code must be unique" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create todo" }, { status: 500 });
  }
}
/**
 * ->Add a new todo to the database.
 * 
 * prisma.todo.create() to insert the new todo into the database.
 */
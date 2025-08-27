import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET todo by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id); // convert string id from URL to number
  try {
    const todo = await prisma.todo.findUnique({ where: { id } });
    if (!todo) return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    return NextResponse.json(todo);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch todo" }, { status: 500 });
  }
}

/**
 * ->Fetch one todo by its unique ID.
 * findUnique → retrieves a single object, not an array
 */

// PATCH todo by ID
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const body = await req.json(); // get the data sent from frontend
  try {
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        title: body.title,
        completed: body.completed,
      },
    });
    return NextResponse.json(updatedTodo);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update todo" }, { status: 500 });
  }
}

/**
 * Gets id from URL.
 * Gets title and completed from request body.
 * Updates the todo using Prisma.
 * Returns updated todo in JSON.
 */

// DELETE todo by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  try {
    await prisma.todo.delete({ where: { id } });
    return NextResponse.json({ message: "Todo deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete todo" }, { status: 500 });
  }
}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const todos = await prisma.todo.findMany();
  console.log("Todos from database:", todos);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

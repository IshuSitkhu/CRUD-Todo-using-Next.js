/*
  Warnings:

  - A unique constraint covering the columns `[taskCode]` on the table `Todo` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Todo" ADD COLUMN     "taskCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Todo_taskCode_key" ON "public"."Todo"("taskCode");

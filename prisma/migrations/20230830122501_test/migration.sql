/*
  Warnings:

  - A unique constraint covering the columns `[Unique_String]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_Unique_String_key" ON "User"("Unique_String");

/*
  Warnings:

  - You are about to drop the column `Unique_String` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_Unique_String_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Unique_String";

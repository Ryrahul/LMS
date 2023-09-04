/*
  Warnings:

  - You are about to drop the `Quiz` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_quizId_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_subjectId_fkey";

-- DropTable
DROP TABLE "Quiz";

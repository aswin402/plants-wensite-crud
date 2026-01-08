/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Plant" DROP CONSTRAINT "Plant_userId_fkey";

-- DropTable
DROP TABLE "User";

-- CreateIndex
CREATE INDEX "Plant_userId_idx" ON "Plant"("userId");

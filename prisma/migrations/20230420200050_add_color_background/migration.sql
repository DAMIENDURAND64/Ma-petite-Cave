/*
  Warnings:

  - A unique constraint covering the columns `[colorId]` on the table `Wine` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Color" ADD COLUMN     "backgroundColor" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Wine_colorId_key" ON "Wine"("colorId");

/*
  Warnings:

  - You are about to drop the column `chapters` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `volumes` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "chapters",
DROP COLUMN "rating",
DROP COLUMN "volumes";

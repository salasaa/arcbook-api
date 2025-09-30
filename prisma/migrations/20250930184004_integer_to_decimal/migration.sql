/*
  Warnings:

  - Made the column `chapters` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `volumes` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "rating" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "chapters" SET NOT NULL,
ALTER COLUMN "chapters" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "volumes" SET NOT NULL,
ALTER COLUMN "volumes" SET DATA TYPE DECIMAL(65,30);

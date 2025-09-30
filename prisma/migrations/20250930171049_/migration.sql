/*
  Warnings:

  - You are about to drop the column `isbn` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `reviewCount` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "isbn",
DROP COLUMN "reviewCount",
ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "rating" DROP NOT NULL,
ALTER COLUMN "chapters" DROP NOT NULL,
ALTER COLUMN "volumes" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

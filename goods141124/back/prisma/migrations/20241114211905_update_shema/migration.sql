/*
  Warnings:

  - You are about to drop the column `quantityInStort` on the `Inventory` table. All the data in the column will be lost.
  - Added the required column `quantityInStore` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "quantityInStort",
ADD COLUMN     "quantityInStore" INTEGER NOT NULL;

/*
  Warnings:

  - You are about to drop the column `created_at` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `quantityInStore` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Store` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `quantityInOrder` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopId` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_storeId_fkey";

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "created_at",
DROP COLUMN "quantityInStore",
DROP COLUMN "storeId",
DROP COLUMN "updated_at",
ADD COLUMN     "quantityInOrder" INTEGER NOT NULL,
ADD COLUMN     "shopId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "created_at",
DROP COLUMN "updated_at";

-- DropTable
DROP TABLE "Store";

-- CreateTable
CREATE TABLE "Shop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

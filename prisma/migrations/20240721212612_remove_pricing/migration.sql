/*
  Warnings:

  - You are about to drop the column `pricingId` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the `Pricing` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pricing` to the `Department` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_pricingId_fkey";

-- AlterTable
ALTER TABLE "Department" DROP COLUMN "pricingId",
ADD COLUMN     "pricing" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "Pricing";

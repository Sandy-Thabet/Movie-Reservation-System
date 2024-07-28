/*
  Warnings:

  - Added the required column `price` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `additionalCost` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `additionalCost` to the `Seat` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SeatType" AS ENUM ('Normal', 'VIP');

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "additionalCost" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Seat" ADD COLUMN     "additionalCost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "type" "SeatType" NOT NULL DEFAULT 'Normal';

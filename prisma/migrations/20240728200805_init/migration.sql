/*
  Warnings:

  - Added the required column `date` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "showTime" SET DATA TYPE TEXT,
ALTER COLUMN "endTime" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Seat" ALTER COLUMN "additionalCost" DROP NOT NULL,
ALTER COLUMN "type" DROP NOT NULL;

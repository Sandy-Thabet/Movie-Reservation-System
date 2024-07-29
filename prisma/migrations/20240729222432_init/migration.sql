/*
  Warnings:

  - Added the required column `endTime` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `showTime` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "endTime",
ADD COLUMN     "endTime" TIMESTAMPTZ(3) NOT NULL,
DROP COLUMN "showTime",
ADD COLUMN     "showTime" TIMESTAMPTZ(3) NOT NULL;

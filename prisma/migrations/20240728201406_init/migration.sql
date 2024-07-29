/*
  Warnings:

  - The `showTime` column on the `Schedule` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `endTime` column on the `Schedule` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "showTime",
ADD COLUMN     "showTime" TIME(1),
DROP COLUMN "endTime",
ADD COLUMN     "endTime" TIME(0);

/*
  Warnings:

  - The values [InProgress] on the enum `PaymentStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentStatus_new" AS ENUM ('Pending', 'Completed', 'Failed', 'Cancelled');
ALTER TABLE "Reservation" ALTER COLUMN "paymentStatus" DROP DEFAULT;
ALTER TABLE "Reservation" ALTER COLUMN "paymentStatus" TYPE "PaymentStatus_new" USING ("paymentStatus"::text::"PaymentStatus_new");
ALTER TYPE "PaymentStatus" RENAME TO "PaymentStatus_old";
ALTER TYPE "PaymentStatus_new" RENAME TO "PaymentStatus";
DROP TYPE "PaymentStatus_old";
ALTER TABLE "Reservation" ALTER COLUMN "paymentStatus" SET DEFAULT 'Pending';
COMMIT;

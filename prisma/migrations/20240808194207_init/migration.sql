-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('User', 'Admin');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRoles" DEFAULT 'User',
ALTER COLUMN "verificationCode" DROP NOT NULL,
ALTER COLUMN "verificationCode" DROP DEFAULT;

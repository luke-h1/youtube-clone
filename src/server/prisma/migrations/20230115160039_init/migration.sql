-- AlterTable
ALTER TABLE "videos" ADD COLUMN     "publishedAt" TIMESTAMP(3);

-- DropEnum
DROP TYPE "Extension";

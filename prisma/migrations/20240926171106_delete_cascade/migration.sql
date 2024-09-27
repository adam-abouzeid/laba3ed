-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_needId_fkey";

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_needId_fkey" FOREIGN KEY ("needId") REFERENCES "Need"("id") ON DELETE CASCADE ON UPDATE CASCADE;

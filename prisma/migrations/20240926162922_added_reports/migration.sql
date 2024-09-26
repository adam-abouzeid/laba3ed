-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "reason" TEXT NOT NULL,
    "needId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_needId_fkey" FOREIGN KEY ("needId") REFERENCES "Need"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "RequestDeletionToken" (
    "id" SERIAL NOT NULL,
    "needId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RequestDeletionToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RequestDeletionToken_needId_key" ON "RequestDeletionToken"("needId");

-- CreateIndex
CREATE UNIQUE INDEX "RequestDeletionToken_token_key" ON "RequestDeletionToken"("token");

-- AddForeignKey
ALTER TABLE "RequestDeletionToken" ADD CONSTRAINT "RequestDeletionToken_needId_fkey" FOREIGN KEY ("needId") REFERENCES "Need"("id") ON DELETE CASCADE ON UPDATE CASCADE;

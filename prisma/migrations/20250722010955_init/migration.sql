-- CreateTable
CREATE TABLE "summaries" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "strataNumber" TEXT NOT NULL,
    "summary" JSONB NOT NULL,
    "pdfPath" TEXT NOT NULL,
    "developer" TEXT,
    "city" TEXT,
    "building" TEXT,
    "unitNumber" TEXT,
    "streetNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "summaries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "summaries_userId_idx" ON "summaries"("userId");

-- CreateIndex
CREATE INDEX "summaries_userId_createdAt_idx" ON "summaries"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "summaries_strataNumber_idx" ON "summaries"("strataNumber");

-- CreateTable
CREATE TABLE "verifiedUser" (
    "id" INTEGER NOT NULL,
    "Userid" TEXT NOT NULL,
    "uniqueString" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "verifiedUser_id_key" ON "verifiedUser"("id");

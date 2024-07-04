/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `GlobalSetting` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GlobalSetting_key_key" ON "GlobalSetting"("key");

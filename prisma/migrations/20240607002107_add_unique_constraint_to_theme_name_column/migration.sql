/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `themes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "themes_name_key" ON "themes"("name");

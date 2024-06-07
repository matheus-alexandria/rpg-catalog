/*
  Warnings:

  - You are about to drop the column `theme` on the `games` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "games" DROP COLUMN "theme";

-- CreateTable
CREATE TABLE "game_themes" (
    "id" TEXT NOT NULL,
    "is_main" BOOLEAN NOT NULL,
    "game_id" TEXT NOT NULL,
    "theme_id" TEXT NOT NULL,

    CONSTRAINT "game_themes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "themes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "themes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "game_themes" ADD CONSTRAINT "game_themes_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_themes" ADD CONSTRAINT "game_themes_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "themes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

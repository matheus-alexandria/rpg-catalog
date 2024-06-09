-- DropForeignKey
ALTER TABLE "game_themes" DROP CONSTRAINT "game_themes_game_id_fkey";

-- DropForeignKey
ALTER TABLE "game_themes" DROP CONSTRAINT "game_themes_theme_id_fkey";

-- AddForeignKey
ALTER TABLE "game_themes" ADD CONSTRAINT "game_themes_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_themes" ADD CONSTRAINT "game_themes_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "themes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

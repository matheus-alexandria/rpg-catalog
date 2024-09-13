-- AlterTable
ALTER TABLE "games" ADD COLUMN     "explanation" TEXT;

-- CreateTable
CREATE TABLE "hints" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "question" TEXT,
    "game_id" TEXT NOT NULL,

    CONSTRAINT "hints_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "hints" ADD CONSTRAINT "hints_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

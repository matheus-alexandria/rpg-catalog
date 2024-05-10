-- CreateTable
CREATE TABLE "games" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cover_path" TEXT,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

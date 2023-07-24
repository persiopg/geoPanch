-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Pontos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pontos" TEXT NOT NULL,
    "timer" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Pontos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

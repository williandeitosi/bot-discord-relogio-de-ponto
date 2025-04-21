/*
  Warnings:

  - Made the column `userId` on table `Punch` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Punch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Punch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Punch" ("id", "timestamp", "type", "userId") SELECT "id", "timestamp", "type", "userId" FROM "Punch";
DROP TABLE "Punch";
ALTER TABLE "new_Punch" RENAME TO "Punch";
CREATE INDEX "Punch_userId_timestamp_idx" ON "Punch"("userId", "timestamp");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

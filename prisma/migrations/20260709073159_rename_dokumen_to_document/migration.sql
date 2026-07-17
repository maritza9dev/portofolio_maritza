/*
  Warnings:

  - You are about to drop the column `dokumen` on the `biodata` table. All the data in the column will be lost.
  - Added the required column `document` to the `biodata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "biodata" DROP COLUMN "dokumen",
ADD COLUMN     "document" TEXT NOT NULL;

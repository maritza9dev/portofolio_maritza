/*
  Warnings:

  - Added the required column `dokumen` to the `biodata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "biodata" ADD COLUMN     "dokumen" TEXT NOT NULL;

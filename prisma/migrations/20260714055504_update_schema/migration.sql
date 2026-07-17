/*
  Warnings:

  - The values [SoftSkill,HardSkill] on the enum `SkillCategory` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `projectDate` on the `Project` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SkillCategory_new" AS ENUM ('SoftSkills', 'HardSkills', 'Tools');
ALTER TABLE "Skill" ALTER COLUMN "category" TYPE "SkillCategory_new" USING ("category"::text::"SkillCategory_new");
ALTER TYPE "SkillCategory" RENAME TO "SkillCategory_old";
ALTER TYPE "SkillCategory_new" RENAME TO "SkillCategory";
DROP TYPE "public"."SkillCategory_old";
COMMIT;

-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Education" ALTER COLUMN "major" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Experience" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "description" DROP NOT NULL,
DROP COLUMN "projectDate",
ADD COLUMN     "projectDate" INTEGER NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Skill" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "biodata" ALTER COLUMN "updatedAt" DROP NOT NULL;

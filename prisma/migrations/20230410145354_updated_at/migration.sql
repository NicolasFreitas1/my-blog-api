/*
  Warnings:

  - Made the column `dt_updated` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "post" ALTER COLUMN "dt_updated" DROP DEFAULT;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "dt_updated" SET NOT NULL,
ALTER COLUMN "dt_updated" DROP DEFAULT;

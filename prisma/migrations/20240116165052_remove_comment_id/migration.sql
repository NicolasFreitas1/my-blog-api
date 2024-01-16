/*
  Warnings:

  - You are about to drop the column `commentId` on the `comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_id_parent_comment_fkey";

-- AlterTable
ALTER TABLE "comment" DROP COLUMN "commentId";

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_id_parent_comment_fkey" FOREIGN KEY ("id_parent_comment") REFERENCES "comment"("id_comment") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `id_answer` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the `answer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "answer" DROP CONSTRAINT "answer_id_author_fkey";

-- DropForeignKey
ALTER TABLE "answer" DROP CONSTRAINT "answer_id_post_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_id_answer_fkey";

-- AlterTable
ALTER TABLE "comment" DROP COLUMN "id_answer",
ADD COLUMN     "commentId" INTEGER,
ADD COLUMN     "id_parent_comment" INTEGER;

-- DropTable
DROP TABLE "answer";

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_id_parent_comment_fkey" FOREIGN KEY ("id_parent_comment") REFERENCES "comment"("id_comment") ON DELETE SET NULL ON UPDATE CASCADE;

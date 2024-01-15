/*
  Warnings:

  - You are about to drop the column `content_comment` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `id_user_profile` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `functionality` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `screen` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_profile_functionality` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_profile_screen` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[ds_title]` on the table `post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ds_comment` to the `comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_author` to the `comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ds_content` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ds_title` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_author` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_id_user_fkey";

-- DropForeignKey
ALTER TABLE "functionality" DROP CONSTRAINT "functionality_id_screen_fkey";

-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_id_user_fkey";

-- DropForeignKey
ALTER TABLE "screen" DROP CONSTRAINT "screen_id_parent_screen_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_id_user_profile_fkey";

-- DropForeignKey
ALTER TABLE "user_profile_functionality" DROP CONSTRAINT "user_profile_functionality_id_functionality_fkey";

-- DropForeignKey
ALTER TABLE "user_profile_functionality" DROP CONSTRAINT "user_profile_functionality_id_user_profile_fkey";

-- DropForeignKey
ALTER TABLE "user_profile_screen" DROP CONSTRAINT "user_profile_screen_id_screen_fkey";

-- DropForeignKey
ALTER TABLE "user_profile_screen" DROP CONSTRAINT "user_profile_screen_id_user_profile_fkey";

-- DropIndex
DROP INDEX "post_title_key";

-- AlterTable
ALTER TABLE "comment" DROP COLUMN "content_comment",
DROP COLUMN "id_user",
ADD COLUMN     "ds_comment" VARCHAR(100) NOT NULL,
ADD COLUMN     "id_answer" INTEGER,
ADD COLUMN     "id_author" INTEGER NOT NULL,
ALTER COLUMN "id_post" DROP NOT NULL;

-- AlterTable
ALTER TABLE "post" DROP COLUMN "content",
DROP COLUMN "id_user",
DROP COLUMN "title",
ADD COLUMN     "ds_content" VARCHAR(200) NOT NULL,
ADD COLUMN     "ds_title" VARCHAR(50) NOT NULL,
ADD COLUMN     "id_author" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "id_user_profile";

-- DropTable
DROP TABLE "functionality";

-- DropTable
DROP TABLE "screen";

-- DropTable
DROP TABLE "user_profile";

-- DropTable
DROP TABLE "user_profile_functionality";

-- DropTable
DROP TABLE "user_profile_screen";

-- CreateTable
CREATE TABLE "answer" (
    "id_answer" SERIAL NOT NULL,
    "id_author" INTEGER NOT NULL,
    "id_post" INTEGER NOT NULL,
    "ds_content" VARCHAR(200) NOT NULL,
    "dt_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated" TIMESTAMP(3),

    CONSTRAINT "answer_pkey" PRIMARY KEY ("id_answer")
);

-- CreateIndex
CREATE UNIQUE INDEX "post_ds_title_key" ON "post"("ds_title");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_id_author_fkey" FOREIGN KEY ("id_author") REFERENCES "user"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_id_author_fkey" FOREIGN KEY ("id_author") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "post"("id_post") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_id_author_fkey" FOREIGN KEY ("id_author") REFERENCES "user"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_id_answer_fkey" FOREIGN KEY ("id_answer") REFERENCES "answer"("id_answer") ON DELETE SET NULL ON UPDATE CASCADE;

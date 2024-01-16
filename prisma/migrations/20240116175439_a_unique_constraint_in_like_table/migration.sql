/*
  Warnings:

  - A unique constraint covering the columns `[id_post,id_user]` on the table `like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "like_id_post_id_user_key" ON "like"("id_post", "id_user");

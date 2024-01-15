/*
  Warnings:

  - A unique constraint covering the columns `[nm_login]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_nm_login_key" ON "user"("nm_login");

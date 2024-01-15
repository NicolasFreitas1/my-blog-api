/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `nm_password` on the `user` table. All the data in the column will be lost.
  - Added the required column `vl_password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "id",
DROP COLUMN "nm_password",
ADD COLUMN     "id_user" SERIAL NOT NULL,
ADD COLUMN     "vl_password" TEXT NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id_user");

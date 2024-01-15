/*
  Warnings:

  - You are about to drop the column `userProfileId` on the `user` table. All the data in the column will be lost.
  - Added the required column `id_user_profile` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_userProfileId_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "userProfileId",
ADD COLUMN     "id_user_profile" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_id_user_profile_fkey" FOREIGN KEY ("id_user_profile") REFERENCES "user_profile"("id_user_profile") ON DELETE NO ACTION ON UPDATE NO ACTION;

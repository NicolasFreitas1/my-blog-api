-- AlterTable
ALTER TABLE "user" ADD COLUMN     "userProfileId" INTEGER;

-- CreateTable
CREATE TABLE "screen" (
    "id_screen" INTEGER NOT NULL,
    "id_parent_screen" INTEGER,
    "vl_path" VARCHAR(50) NOT NULL,
    "nm_screen" VARCHAR(50) NOT NULL,
    "vl_screen_level" INTEGER NOT NULL,

    CONSTRAINT "screen_pkey" PRIMARY KEY ("id_screen")
);

-- CreateTable
CREATE TABLE "functionality" (
    "id_functionality" INTEGER NOT NULL,
    "id_screen" INTEGER NOT NULL,
    "cd_functionality" VARCHAR(6) NOT NULL,
    "nm_functionality" VARCHAR(80) NOT NULL,

    CONSTRAINT "functionality_pkey" PRIMARY KEY ("id_functionality")
);

-- CreateTable
CREATE TABLE "user_profile_functionality" (
    "id_user_profile" INTEGER NOT NULL,
    "id_functionality" INTEGER NOT NULL,

    CONSTRAINT "user_profile_functionality_pkey" PRIMARY KEY ("id_user_profile","id_functionality")
);

-- CreateTable
CREATE TABLE "user_profile" (
    "id_user_profile" SERIAL NOT NULL,
    "nm_user_profile" VARCHAR(20) NOT NULL,

    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("id_user_profile")
);

-- CreateTable
CREATE TABLE "user_profile_screen" (
    "id_user_profile" INTEGER NOT NULL,
    "id_screen" INTEGER NOT NULL,

    CONSTRAINT "user_profile_screen_pkey" PRIMARY KEY ("id_user_profile","id_screen")
);

-- CreateIndex
CREATE UNIQUE INDEX "screen_vl_path_key" ON "screen"("vl_path");

-- CreateIndex
CREATE UNIQUE INDEX "screen_nm_screen_key" ON "screen"("nm_screen");

-- CreateIndex
CREATE UNIQUE INDEX "functionality_cd_functionality_key" ON "functionality"("cd_functionality");

-- CreateIndex
CREATE UNIQUE INDEX "functionality_nm_functionality_key" ON "functionality"("nm_functionality");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_nm_user_profile_key" ON "user_profile"("nm_user_profile");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "user_profile"("id_user_profile") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "screen" ADD CONSTRAINT "screen_id_parent_screen_fkey" FOREIGN KEY ("id_parent_screen") REFERENCES "screen"("id_screen") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "functionality" ADD CONSTRAINT "functionality_id_screen_fkey" FOREIGN KEY ("id_screen") REFERENCES "screen"("id_screen") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_profile_functionality" ADD CONSTRAINT "user_profile_functionality_id_user_profile_fkey" FOREIGN KEY ("id_user_profile") REFERENCES "user_profile"("id_user_profile") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_profile_functionality" ADD CONSTRAINT "user_profile_functionality_id_functionality_fkey" FOREIGN KEY ("id_functionality") REFERENCES "functionality"("id_functionality") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_profile_screen" ADD CONSTRAINT "user_profile_screen_id_user_profile_fkey" FOREIGN KEY ("id_user_profile") REFERENCES "user_profile"("id_user_profile") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_profile_screen" ADD CONSTRAINT "user_profile_screen_id_screen_fkey" FOREIGN KEY ("id_screen") REFERENCES "screen"("id_screen") ON DELETE CASCADE ON UPDATE NO ACTION;

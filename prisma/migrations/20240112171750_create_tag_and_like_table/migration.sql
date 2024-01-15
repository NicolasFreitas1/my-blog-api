-- CreateTable
CREATE TABLE "tag" (
    "id_tag" SERIAL NOT NULL,
    "nm_tag" VARCHAR(100) NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id_tag")
);

-- CreateTable
CREATE TABLE "post_tag" (
    "id_post_tag" SERIAL NOT NULL,
    "id_post" INTEGER NOT NULL,
    "id_tag" INTEGER NOT NULL,

    CONSTRAINT "post_tag_pkey" PRIMARY KEY ("id_post_tag")
);

-- CreateTable
CREATE TABLE "like" (
    "id_like" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_post" INTEGER NOT NULL,
    "dt_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "like_pkey" PRIMARY KEY ("id_like")
);

-- CreateIndex
CREATE UNIQUE INDEX "post_tag_id_post_id_tag_key" ON "post_tag"("id_post", "id_tag");

-- AddForeignKey
ALTER TABLE "post_tag" ADD CONSTRAINT "post_tag_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "post"("id_post") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_tag" ADD CONSTRAINT "post_tag_id_tag_fkey" FOREIGN KEY ("id_tag") REFERENCES "tag"("id_tag") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "post"("id_post") ON DELETE RESTRICT ON UPDATE CASCADE;

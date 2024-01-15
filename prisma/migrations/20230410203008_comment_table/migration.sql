-- CreateTable
CREATE TABLE "Comments" (
    "id_comment" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_post" INTEGER NOT NULL,
    "content_comment" VARCHAR(100) NOT NULL,
    "dt_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id_comment")
);

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "post"("id_post") ON DELETE CASCADE ON UPDATE CASCADE;

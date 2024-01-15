-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nm_user" VARCHAR(50) NOT NULL,
    "nm_login" VARCHAR(30) NOT NULL,
    "nm_password" TEXT NOT NULL,
    "dt_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name_p" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "tech" TEXT[],
    "image" TEXT NOT NULL,
    "link_github" TEXT,
    "projectDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

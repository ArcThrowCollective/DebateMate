/*
  Warnings:

  - You are about to drop the column `image_url` on the `Rooms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Rooms" DROP COLUMN "image_url",
ADD COLUMN     "imageUrl" TEXT;

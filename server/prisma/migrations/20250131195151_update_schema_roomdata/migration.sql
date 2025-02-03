/*
  Warnings:

  - You are about to drop the column `title` on the `Channels` table. All the data in the column will be lost.
  - You are about to drop the column `debateId` on the `Debate_History` table. All the data in the column will be lost.
  - You are about to drop the column `debateId` on the `Participants` table. All the data in the column will be lost.
  - You are about to drop the column `debateId` on the `Requests_To_Speak` table. All the data in the column will be lost.
  - You are about to drop the `Debates` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Channels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `Debate_History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `Participants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `Requests_To_Speak` table without a default value. This is not possible if the table is not empty.
  - Made the column `updatedAt` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Debate_History" DROP CONSTRAINT "Debate_History_debateId_fkey";

-- DropForeignKey
ALTER TABLE "Debates" DROP CONSTRAINT "Debates_channelId_fkey";

-- DropForeignKey
ALTER TABLE "Participants" DROP CONSTRAINT "Participants_debateId_fkey";

-- DropForeignKey
ALTER TABLE "Requests_To_Speak" DROP CONSTRAINT "Requests_To_Speak_debateId_fkey";

-- AlterTable
ALTER TABLE "Channels" DROP COLUMN "title",
ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Debate_History" DROP COLUMN "debateId",
ADD COLUMN     "roomId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Participants" DROP COLUMN "debateId",
ADD COLUMN     "roomId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Requests_To_Speak" DROP COLUMN "debateId",
ADD COLUMN     "roomId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "updatedAt" SET NOT NULL;

-- DropTable
DROP TABLE "Debates";

-- CreateTable
CREATE TABLE "Rooms" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "topic" TEXT NOT NULL,
    "channelId" UUID NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rooms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participants" ADD CONSTRAINT "Participants_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Debate_History" ADD CONSTRAINT "Debate_History_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requests_To_Speak" ADD CONSTRAINT "Requests_To_Speak_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `receiverImage` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverName` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderImage` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderName` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "receiverImage" TEXT NOT NULL,
ADD COLUMN     "receiverName" TEXT NOT NULL,
ADD COLUMN     "senderImage" TEXT NOT NULL,
ADD COLUMN     "senderName" TEXT NOT NULL;

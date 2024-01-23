/*
  Warnings:

  - You are about to drop the column `receiverImage` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `receiverName` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "receiverImage",
DROP COLUMN "receiverName";

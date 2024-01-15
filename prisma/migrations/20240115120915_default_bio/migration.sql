/*
  Warnings:

  - Made the column `biography` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "biography" SET NOT NULL,
ALTER COLUMN "biography" SET DEFAULT 'Pas encore de présentation';

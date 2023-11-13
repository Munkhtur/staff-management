/*
  Warnings:

  - The `resetTokenExpiry` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `resetTokenExpiry`,
    ADD COLUMN `resetTokenExpiry` DATETIME(3) NULL;

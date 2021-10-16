/*
  Warnings:

  - Added the required column `cat_id` to the `portfolio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `portfolio` ADD COLUMN `cat_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `portfolio` ADD CONSTRAINT `portfolio_cat_id_fkey` FOREIGN KEY (`cat_id`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

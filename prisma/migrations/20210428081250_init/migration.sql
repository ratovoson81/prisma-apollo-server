/*
  Warnings:

  - You are about to alter the column `title` on the `post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `authorId` ON `post`;

-- AlterTable
ALTER TABLE `post` ADD COLUMN     `viewCount` INTEGER NOT NULL DEFAULT 0,
    MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `authorId` INTEGER;

-- DropTable
DROP TABLE `profile`;

-- AddForeignKey
ALTER TABLE `Post` ADD FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

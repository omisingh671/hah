-- AlterTable
ALTER TABLE `users` ADD COLUMN `mustChangePassword` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX `sessions_expiresAt_idx` ON `sessions`(`expiresAt`);

-- CreateIndex
CREATE INDEX `sessions_createdAt_idx` ON `sessions`(`createdAt`);

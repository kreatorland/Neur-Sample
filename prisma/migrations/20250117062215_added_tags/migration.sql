/*
  Warnings:

  - You are about to drop the column `telegramId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ownerId,publicKey]` on the table `wallets` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "WalletSource" AS ENUM ('CUSTOM', 'PRIVY');

-- CreateEnum
CREATE TYPE "Chain" AS ENUM ('SOLANA');

-- DropIndex
DROP INDEX "wallets_ownerId_key";

-- AlterTable
ALTER TABLE "actions" ADD COLUMN     "lastFailureAt" TIMESTAMP(3),
ADD COLUMN     "lastSuccessAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "telegramId";

-- AlterTable
ALTER TABLE "wallets" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "chain" "Chain" NOT NULL DEFAULT 'SOLANA',
ADD COLUMN     "delegated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "walletSource" "WalletSource" NOT NULL DEFAULT 'CUSTOM',
ALTER COLUMN "encryptedPrivateKey" DROP NOT NULL;

-- CreateTable
CREATE TABLE "telegram_chats" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "chatId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "telegram_chats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "telegram_chats_userId_key" ON "telegram_chats"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "wallets_ownerId_publicKey_key" ON "wallets"("ownerId", "publicKey");

-- AddForeignKey
ALTER TABLE "telegram_chats" ADD CONSTRAINT "telegram_chats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `email` on the `Ticket` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Ticket_email_key";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "email";

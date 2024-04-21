/*
  Warnings:

  - A unique constraint covering the columns `[root_folder_id]` on the table `boxes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `root_folder_id` to the `boxes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "boxes" ADD COLUMN     "root_folder_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "boxes_root_folder_id_key" ON "boxes"("root_folder_id");

-- AddForeignKey
ALTER TABLE "boxes" ADD CONSTRAINT "boxes_root_folder_id_fkey" FOREIGN KEY ("root_folder_id") REFERENCES "folders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

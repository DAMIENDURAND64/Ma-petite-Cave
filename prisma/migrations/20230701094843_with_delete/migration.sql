-- DropForeignKey
ALTER TABLE "WineBottle" DROP CONSTRAINT "WineBottle_wineId_fkey";

-- AddForeignKey
ALTER TABLE "WineBottle" ADD CONSTRAINT "WineBottle_wineId_fkey" FOREIGN KEY ("wineId") REFERENCES "Wine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

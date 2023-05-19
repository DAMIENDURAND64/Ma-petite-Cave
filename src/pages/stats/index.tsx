import { useMantineTheme } from "@mantine/core";
import { useSession } from "next-auth/react";
import React from "react";
import { DoughnutForNumOfBottles } from "~/components/charts/DoughnutForNumOfBottles";
import { DoughnutForValOfBottles } from "~/components/charts/DoughnutForValOfBottles";
import { api } from "~/utils/api";

const Index = () => {
  const { data: sessionData } = useSession();
  const theme = useMantineTheme();

  const { data: allWinesData } = api.wines.getAll.useQuery();
  const wineBottlesByColor = [1, 2, 3, 4, 5, 6].reduce(
    // 1:red, 2:white, 3:rose, 4:sparkling, 5:liquors, 6:spirits
    (acc: Record<number, number>, colorId) => {
      const wineData = allWinesData?.filter(
        (wine) => wine.wineColorId === colorId
      );
      acc[colorId] =
        wineData?.reduce(
          (total, wine) =>
            total +
            wine.wineBottles.reduce((sum, bottle) => sum + bottle.quantity, 0),
          0
        ) || 0;
      return acc;
    },
    {} as Record<number, number>
  );
  const totalWineBottles = Object.values(wineBottlesByColor).reduce(
    (sum, value) => sum + value,
    0
  );

  const wineBottlesValues = [1, 2, 3, 4, 5, 6].reduce(
    // 1:red, 2:white, 3:rose, 4:sparkling, 5:liquors, 6:spirits
    (acc: Record<number, number>, colorId) => {
      const wineData = allWinesData?.filter(
        (wine) => wine.wineColorId === colorId
      );
      acc[colorId] =
        wineData?.reduce(
          (total, wine) =>
            total +
            wine.wineBottles.reduce((sum, bottle) => sum + bottle.price, 0),
          0
        ) || 0;
      return acc;
    },
    {} as Record<number, number>
  );

  const totalWineBottlesValue = Object.values(wineBottlesValues).reduce(
    (sum, value) => sum + value,
    0
  );
  if (sessionData === null) {
    return (
      <div className="p-3">
        <h1>Homepage</h1>
        <p>Sign in to see your homepage</p>
      </div>
    );
  }
  return (
    <div className="flexcol y-center w-full p-3">
      <h1>Mes Stats</h1>
      <div className="flexcol w-full gap-3">
        <div
          className={`w-full rounded-md border border-gray-500 ${
            theme.colorScheme === "dark" ? "bg-[#1A1B1E]" : "bg-slate-100"
          } p-3 shadow-2xl`}
        >
          <p>Nombre de bouteilles de vins : {totalWineBottles}</p>
          <DoughnutForNumOfBottles wineBottlesByColor={wineBottlesByColor} />
        </div>
        <div
          className={`w-full rounded-md border border-gray-500 ${
            theme.colorScheme === "dark" ? "bg-[#1A1B1E]" : "bg-slate-100"
          } p-3 shadow-2xl`}
        >
          <p>Valeur de ma Cave : {totalWineBottlesValue}€ </p>
          <DoughnutForValOfBottles wineBottlesValues={wineBottlesValues} />
        </div>
      </div>
    </div>
  );
};
export default Index;

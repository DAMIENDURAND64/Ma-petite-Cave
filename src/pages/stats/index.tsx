import { useMantineTheme } from "@mantine/core";
import { useSession } from "next-auth/react";
import React from "react";
import { DoughnutForFormatOfBottles } from "~/components/charts/DoughnutForFormatBottle";
import { DoughnutForNumOfBottles } from "~/components/charts/DoughnutForNumOfBottles";
import { DoughnutForValOfBottles } from "~/components/charts/DoughnutForValOfBottles";
import Unauthorized from "~/components/unauthorized/Unauthorized";
import { api } from "~/utils/api";
import { Colors } from "~/utils/colors/Colors";

const Index = () => {
  const labels = [
    "Rouge",
    "Blanc",
    "Rosé",
    "Pétillant",
    "Spiritueux",
    "Liqueurs",
  ];
  const colorClassMap = [
    "bg-red-500",
    "bg-gray-500",
    "bg-pink-500",
    "bg-yellow-500",
    "bg-brown-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-orange-500",
    "bg-purple-500",
    "bg-black",
  ];

  const { data: sessionData } = useSession();
  const theme = useMantineTheme();

  if (sessionData === null) {
    return <Unauthorized />;
  }

  const { data: allWinesData } = api.wines.getAll.useQuery();
  const { data: allFormatsData } = api.bottleFormat.getAll.useQuery();

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
            wine.wineBottles.reduce(
              (sum, bottle) => sum + bottle.price * bottle.quantity,
              0
            ),
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

  const formatNames: Map<number, string> = new Map(
    allFormatsData?.map((format) => [format.id, format.name])
  );
  const formatCounts = {} as Record<string, number>;

  allWinesData?.forEach((wine) => {
    wine.wineBottles.forEach((bottle) => {
      const formatName: string = formatNames.get(bottle.formatId) || "Unknown";
      const quantity = bottle.quantity;

      if (formatCounts[formatName]) {
        formatCounts[formatName] += quantity;
      } else {
        formatCounts[formatName] = quantity;
      }
    });
  });

  return (
    <div className="flexcol y-center w-full pb-3">
      <h1>Mes Stats</h1>
      <div className="flexcol w-full gap-3">
        <div
          className={`w-full rounded-md border border-gray-500 ${
            theme.colorScheme === "dark" ? "bg-[#1A1B1E]" : "bg-slate-100"
          } p-3 shadow-2xl`}
        >
          <p>Nombre de bouteilles de vins : {totalWineBottles}</p>
          {allWinesData?.length === 0 ? (
            <div className="xy-center flex h-44">
              Ajoute un vin pour voir tes stats
            </div>
          ) : (
            <DoughnutForNumOfBottles wineBottlesByColor={wineBottlesByColor} />
          )}
          <div className="flex w-full justify-around gap-3">
            {Object.entries(Colors).map(([key, color], index) => {
              return (
                <div className="flexcol xy-center" key={index}>
                  <div className={`${color} relative h-5 w-5 rounded-lg`} />
                  <p className="text-xs">{labels[parseInt(key) - 1]}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className={`w-full rounded-md border border-gray-500 ${
            theme.colorScheme === "dark" ? "bg-[#1A1B1E]" : "bg-slate-100"
          } p-3 shadow-2xl`}
        >
          <p>Valeur de ma Cave : {totalWineBottlesValue}€ </p>
          {allWinesData?.length === 0 ? (
            <div className="xy-center flex h-44">
              Ajoute un vin pour voir tes stats
            </div>
          ) : (
            <DoughnutForValOfBottles wineBottlesValues={wineBottlesValues} />
          )}
          <div className="flex w-full justify-around gap-3">
            {Object.entries(Colors).map(([key, color], index) => {
              return (
                <div className="flexcol xy-center" key={index}>
                  <div className={`${color} relative h-5 w-5 rounded-lg`} />
                  <p className="text-xs">{labels[parseInt(key) - 1]}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className={`w-full rounded-md border border-gray-500 ${
            theme.colorScheme === "dark" ? "bg-[#1A1B1E]" : "bg-slate-100"
          } p-3 shadow-2xl`}
        >
          <p>Mes differents formats : </p>
          {allWinesData?.length === 0 ? (
            <div className="xy-center flex h-44">
              Ajoute un vin pour voir tes stats
            </div>
          ) : (
            <DoughnutForFormatOfBottles formatCounts={formatCounts} />
          )}
          <div className="flex w-full flex-wrap justify-around gap-3">
            {formatCounts &&
              Object.entries(formatCounts).map(([key], index) => {
                return (
                  <div className="flexcol xy-center" key={index}>
                    <div className="flexcol xy-center" key={index}>
                      <div
                        className={`${
                          colorClassMap[index] as string
                        } relative h-5 w-5 rounded-lg`}
                      />
                    </div>
                    <p className="text-xs">{key}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;

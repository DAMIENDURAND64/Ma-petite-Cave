import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { api } from "~/utils/api";

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutV1() {
  const { data: redWineData } = api.wines.getAllByColor.useQuery({
    wineColorId: 1,
  });
  const { data: whiteWineData } = api.wines.getAllByColor.useQuery({
    wineColorId: 2,
  });
  const { data: roseWineData } = api.wines.getAllByColor.useQuery({
    wineColorId: 3,
  });
  const { data: MousseuxWineData } = api.wines.getAllByColor.useQuery({
    wineColorId: 4,
  });
  const { data: LiquorsWineData } = api.wines.getAllByColor.useQuery({
    wineColorId: 5,
  });
  const { data: SpiritueuxWineData } = api.wines.getAllByColor.useQuery({
    wineColorId: 6,
  });

  const redWineBottles = redWineData?.reduce(
    (acc, wine) => acc + wine.wineBottles.length,
    0
  );
  const whiteWineBottles = whiteWineData?.reduce(
    (acc, wine) => acc + wine.wineBottles.length,
    0
  );
  const roseWineBottles = roseWineData?.reduce(
    (acc, wine) => acc + wine.wineBottles.length,
    0
  );
  const MousseuxWineBottles = MousseuxWineData?.reduce(
    (acc, wine) => acc + wine.wineBottles.length,
    0
  );
  const LiquorsWineBottles = LiquorsWineData?.reduce(
    (acc, wine) => acc + wine.wineBottles.length,
    0
  );
  const SpiritueuxWineBottles = SpiritueuxWineData?.reduce(
    (acc, wine) => acc + wine.wineBottles.length,
    0
  );

  const data = {
    labels: ["Rouge", "Blanc", "Rosé", "Mousseux", "Liqueurs", "Spiritueux"],
    datasets: [
      {
        label: "# of Votes",
        data: [
          redWineBottles,
          whiteWineBottles,
          roseWineBottles,
          MousseuxWineBottles,
          LiquorsWineBottles,
          SpiritueuxWineBottles,
        ],
        backgroundColor: [
          "red",
          "white",
          "pink",
          "gold",
          "green",
          "RGBA(130, 94, 92)",
        ],
        borderColor: [
          "red",
          "yellow",
          "pink",
          "gold",
          "green",
          "RGBA(130, 94, 92)",
        ],
        borderRadius: 5,
        spacing: 5,
      },
    ],
  };
  return <Doughnut data={data} />;
}

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutProps = {
  wineBottlesValues: Record<number, number>;
};

export function DoughnutForValOfBottles({ wineBottlesValues }: DoughnutProps) {
  const data = {
    labels: ["Rouge", "Blanc", "Rosé", "Pétillant", "Spiritueux", "Liqueurs"],
    datasets: [
      {
        label: "Values",

        data: [
          wineBottlesValues[1],
          wineBottlesValues[2],
          wineBottlesValues[3],
          wineBottlesValues[4],
          wineBottlesValues[5],
          wineBottlesValues[6],
        ],

        backgroundColor: [
          // red
          "rgba(247, 8, 8, 1)",
          // white
          "rgba(255, 253, 176, 1)",
          // rose
          "rgba(255, 193, 193, 1)",
          // sparkling
          "rgba(255, 249, 58, 1)",
          // spirits
          "rgba(209, 119, 8, 1)",
          // liquors
          "rgba(19, 158, 1, 1)",
        ],
        borderColor: [
          // red
          "rgba(247, 8, 8, 1)",
          // white
          "rgba(255, 253, 176, 1)",
          // rose
          "rgba(255, 193, 193, 1)",
          // sparkling
          "rgba(255, 249, 58, 1)",
          // spirits
          "rgba(209, 119, 8, 1)",
          // liquors
          "rgba(19, 158, 1, 1)",
        ],
        borderRadius: 6,
        spacing: 6,
        hoverOffset: 40,
        cutout: 60,
        offset: 10,
        radius: 110,
      },
    ],
  };
  return <Doughnut data={data} />;
}

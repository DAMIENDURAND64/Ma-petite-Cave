import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutProps = {
  formatCounts: Record<number, number>;
};

export function DoughnutForFormatOfBottles({ formatCounts }: DoughnutProps) {
  const data = {
    labels: [],
    datasets: [
      {
        data: Object.values(formatCounts).map((formatCount) => formatCount),
        backgroundColor: [
          "red",
          "grey",
          "pink",
          "yellow",
          "brown",
          "green",
          "blue",
          "orange",
          "purple",
          "black",
        ],
        borderColor: [
          "red",
          "grey",
          "pink",
          "yellow",
          "brown",
          "green",
          "blue",
          "orange",
          "purple",
          "black",
        ],

        borderRadius: 3,
        spacing: 6,
        hoverOffset: 40,
        cutout: 80,
        offset: 10,
        radius: 110,
      },
    ],
  };
  return <Doughnut data={data} />;
}

import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ScriptableContext,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  getLiquorsGradient,
  getRedGradient,
  getRoséGradient,
  getSparklingGradient,
  getSpiritsGradient,
  getWhiteGradient,
} from "./gradients";

ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutProps = {
  wineBottlesByColor: Record<number, number>;
};

export function DoughnutForNumOfBottles({ wineBottlesByColor }: DoughnutProps) {
  const data = {
    labels: [],
    datasets: [
      {
        label: "",

        data: [
          wineBottlesByColor[1],
          wineBottlesByColor[2],
          wineBottlesByColor[3],
          wineBottlesByColor[4],
          wineBottlesByColor[5],
          wineBottlesByColor[6],
        ],
        backgroundColor: (context: ScriptableContext<"doughnut">) => {
          const chart = context.chart;
          const { chartArea } = chart;
          if (!chartArea) {
            return undefined;
          }
          if (context.dataIndex === 0) {
            return getRedGradient(chart) || "rgba(247, 8, 8, 1)";
          }
          if (context.dataIndex === 1) {
            return getWhiteGradient(chart) || "rgba(255, 253, 176, 1)";
          }
          if (context.dataIndex === 2) {
            return getRoséGradient(chart) || "rgba(255, 193, 193, 1)";
          }
          if (context.dataIndex === 3) {
            return getSparklingGradient(chart) || "rgba(255, 249, 58, 1)";
          }
          if (context.dataIndex === 4) {
            return getSpiritsGradient(chart) || "rgba(209, 119, 8, 1)";
          }
          if (context.dataIndex === 5) {
            return getLiquorsGradient(chart) || "rgba(19, 158, 1, 1)";
          }
        },
        borderColor: (context: ScriptableContext<"doughnut">) => {
          const chart = context.chart;
          const { chartArea } = chart;
          if (!chartArea) {
            return undefined;
          }
          if (context.dataIndex === 0) {
            return getRedGradient(chart) || "rgba(247, 8, 8, 1)";
          }
          if (context.dataIndex === 1) {
            return getWhiteGradient(chart) || "rgba(255, 253, 176, 1)";
          }
          if (context.dataIndex === 2) {
            return getRoséGradient(chart) || "rgba(255, 193, 193, 1)";
          }
          if (context.dataIndex === 3) {
            return getSparklingGradient(chart) || "rgba(255, 249, 58, 1)";
          }
          if (context.dataIndex === 4) {
            return getSpiritsGradient(chart) || "rgba(209, 119, 8, 1)";
          }
          if (context.dataIndex === 5) {
            return getLiquorsGradient(chart) || "rgba(19, 158, 1, 1)";
          }
        },
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

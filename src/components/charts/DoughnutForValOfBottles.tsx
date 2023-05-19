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
  wineBottlesValues: Record<number, number>;
};

export function DoughnutForValOfBottles({ wineBottlesValues }: DoughnutProps) {
  const data = {
    labels: [],
    datasets: [
      {
        data: [
          wineBottlesValues[1],
          wineBottlesValues[2],
          wineBottlesValues[3],
          wineBottlesValues[4],
          wineBottlesValues[5],
          wineBottlesValues[6],
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

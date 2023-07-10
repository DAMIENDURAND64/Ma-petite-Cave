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
import { Colors } from "~/utils/colors/Colors";
import { labels } from "~/utils/labels/label";
import { type DoughnutForValOfBottlesProps } from "../type";

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutForValOfBottles({
  wineBottlesValues,
}: DoughnutForValOfBottlesProps) {
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

        borderRadius: 3,
        spacing: 6,
        hoverOffset: 40,
        cutout: 80,
        offset: 10,
        radius: 110,
      },
    ],
  };
  return (
    <div className="w-full">
      {Object.keys(data.labels).length === 0 ? (
        <div className="xy-center flex h-44">
          Ajoute un vin pour voir tes stats
        </div>
      ) : (
        <Doughnut data={data} />
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
  );
}

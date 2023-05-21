import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutProps = {
  formatCounts: Record<number, number>;
};

export function DoughnutForFormatOfBottles({ formatCounts }: DoughnutProps) {
  const colorClassMap = [
    "bg-red-700",
    "bg-green-700",
    "bg-pink-700",
    "bg-yellow-700",
    "bg-amber-500",
    "bg-gray-700",
    "bg-blue-700",
    "bg-orange-500",
    "bg-purple-700",
    "bg-cyan-400",
  ];
  const data = {
    labels: [],
    datasets: [
      {
        data: Object.values(formatCounts).map((formatCount) => formatCount),
        backgroundColor: [
          "#b91c1c",
          "#15803d",
          "#be185d",
          "#a16207",
          "#f59e0b",
          "#374151",
          "#1d4ed8",
          "#f97316",
          "#7e22ce",
          "#22d3ee",
        ],
        borderColor: [
          "#b91c1c",
          "#15803d",
          "#be185d",
          "#a16207",
          "#f59e0b",
          "#374151",
          "#1d4ed8",
          "#f97316",
          "#7e22ce",
          "#22d3ee",
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
  return (
    <div className="w-full">
      {Object.keys(formatCounts).length === 0 ? (
        <div className="xy-center flex h-44">
          Ajoute un vin pour voir tes stats
        </div>
      ) : (
        <Doughnut data={data} />
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
  );
}

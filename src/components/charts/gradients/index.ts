import { type Chart as ChartJS } from "chart.js";

export function getRedGradient(chart: ChartJS) {
  const {
    ctx,
    chartArea: { left, right },
  } = chart;
  const gradientSegment = ctx.createLinearGradient(left, 0, right, 0);

  // Tailwind CSS red-900 is RGB(127, 29, 29)
  // Converted to RGBA is rgba(127, 29, 29, 1)
  gradientSegment.addColorStop(0, "rgba(107, 29, 29, 1)");

  // Tailwind CSS red-500 is RGB(220, 38, 38)
  // Converted to RGBA is rgba(220, 38, 38, 1)
  gradientSegment.addColorStop(0.9, "rgba(220, 38, 38, 1)");

  // Tailwind CSS red-400 is RGB(239, 68, 68)
  // Converted to RGBA is rgba(239, 68, 68, 1)
  gradientSegment.addColorStop(1, "rgba(289, 68, 68, 1)");

  return gradientSegment;
}

export function getWhiteGradient(chart: ChartJS) {
  const {
    ctx,
    chartArea: { left, right },
  } = chart;
  const gradientSegment = ctx.createLinearGradient(left, 0, right, 0);

  // Tailwind CSS yellow-300 is RGB(252, 211, 77)
  // Converted to RGBA is rgba(252, 211, 77, 1)
  gradientSegment.addColorStop(0, "rgba(252, 211, 77, 1)");

  // Tailwind CSS yellow-100 is RGB(253, 230, 138)
  // Converted to RGBA is rgba(253, 230, 138, 1)
  gradientSegment.addColorStop(1, "rgba(253, 230, 138, 1)");

  return gradientSegment;
}

export function getRoséGradient(chart: ChartJS) {
  const {
    ctx,
    chartArea: { left, right },
  } = chart;
  const gradientSegment = ctx.createLinearGradient(left, 0, right, 0);

  // Tailwind CSS rose-600 is RGB(219, 39, 119)
  // Converted to RGBA is rgba(219, 39, 119, 1)
  gradientSegment.addColorStop(0, "rgba(219, 39, 119, 1)");

  // Tailwind CSS rose-300 is RGB(251, 182, 206)
  // Converted to RGBA is rgba(251, 182, 206, 1)
  gradientSegment.addColorStop(1, "rgba(251, 182, 206, 1)");

  return gradientSegment;
}

export function getSparklingGradient(chart: ChartJS) {
  const {
    ctx,
    chartArea: { left, right },
  } = chart;
  const gradientSegment = ctx.createLinearGradient(left, 0, right, 0);

  // Tailwind CSS yellow-900 is RGB(120, 53, 15)
  // Converted to RGBA is rgba(120, 53, 15, 1)
  gradientSegment.addColorStop(0, "rgba(120, 53, 15, 1)");

  // Tailwind CSS yellow-500 is RGB(245, 158, 11)
  // Converted to RGBA is rgba(245, 158, 11, 1)
  gradientSegment.addColorStop(0.5, "rgba(245, 158, 11, 1)");

  // Gradient returns to yellow-900
  gradientSegment.addColorStop(1, "rgba(120, 53, 15, 1)");

  return gradientSegment;
}

export function getSpiritsGradient(chart: ChartJS) {
  const {
    ctx,
    chartArea: { left, right },
  } = chart;
  const gradientSegment = ctx.createLinearGradient(left, 0, right, 0);

  // Tailwind CSS amber-900 is RGB(120, 31, 4)
  // Converted to RGBA is rgba(120, 31, 4, 1)
  gradientSegment.addColorStop(0, "rgba(100, 31, 4, 1)");

  // Tailwind CSS amber-500 is RGB(245, 127, 23)
  // Converted to RGBA is rgba(245, 127, 23, 1)
  gradientSegment.addColorStop(1, "rgba(245, 127, 23, 1)");

  return gradientSegment;
}

export function getLiquorsGradient(chart: ChartJS) {
  const {
    ctx,
    chartArea: { left, right },
  } = chart;
  const gradientSegment = ctx.createLinearGradient(left, 0, right, 0);

  // Tailwind CSS green-900 is RGB(2, 37, 26)
  // Converted to RGBA is rgba(2, 37, 26, 1)
  gradientSegment.addColorStop(0, "rgba(2, 37, 26, 1)");

  // Tailwind CSS green-500 is RGB(16, 185, 129)
  // Converted to RGBA is rgba(16, 185, 129, 1)
  gradientSegment.addColorStop(1, "rgba(16, 185, 19, 1)");

  return gradientSegment;
}

"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  Plugin,
} from "chart.js";
import { FC } from "react";
import { IBarChartProps } from "@/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Custom plugin to set individual bar widths
const customBarWidthPlugin: Plugin<"bar"> = {
  id: "customBarWidth",
  beforeDatasetsDraw: (chart) => {
    const { ctx, data, chartArea } = chart;
    ctx.save();

    data.datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex);
      meta.data.forEach((bar, index) => {
        const width = 20; // Set custom width here
        const halfBarWidth = width / 2;
        const x = bar.x - halfBarWidth;
        const y = bar.y;
        const height = chartArea.bottom - y;

        const bgColor = Array.isArray(dataset.backgroundColor)
          ? dataset.backgroundColor[index]
          : dataset.backgroundColor; // Get individual background color for each bar

        ctx.fillStyle = bgColor;
        ctx.strokeStyle = dataset.borderColor as string;
        ctx.lineWidth = dataset.borderWidth as number;

        // Draw the bar with the correct height and position
        ctx.fillRect(x, y, width, height);
        if (dataset.borderWidth) {
          ctx.strokeRect(x, y, width, height);
        }
      });
    });

    ctx.restore();
    return false;
  },
};

const AverageGradeBarChart: FC<IBarChartProps> = ({ data }) => {
  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",

        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
          color: "#C2C2FF",
          usePointStyle: true,
        },
      },
      title: {
        display: false,
        text: "Average Grade",
        font: {
          size: 24,
        },
        color: "#C2C2FF",
      },
      tooltip: {
        usePointStyle: true,
        backgroundColor: "rgba(0,0,0,0.7)",
        titleFont: {
          size: 16,
          weight: "bold",
        },
        bodyFont: {
          size: 14,
        },
        footerFont: {
          size: 12,
        },
        caretPadding: 10,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          color: "#C2C2FF",
          font: {
            size: 14,
          },
        },
      },
      y: {
        stacked: true,
        grid: {
          color: "rgba(86, 86, 113, 0.2)",
        },
        ticks: {
          color: "#C2C2FF",
          font: {
            size: 14,
          },
        },
        beginAtZero: true,
        min: 0,
        max: 100,
        grace: "10%", // Add padding at the bottom
      },
    },
  };

  return <Bar data={data} options={options} plugins={[customBarWidthPlugin]} />;
};

export default AverageGradeBarChart;

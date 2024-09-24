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
} from "chart.js";
import { FC } from "react";
import { IBarChartProps } from "@/types";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Custom plugin to draw bars with rounded corners

const PerformanceMetricsChart: FC<IBarChartProps> = ({ data }) => {
  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
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
        max: 25,
        grace: "10%", // Add padding at the bottom
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default PerformanceMetricsChart;

"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";

// Import necessary Chart.js modules
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { IDoughnutChartComponentProps } from "@/types";
// Register Chart.js modules
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChartComponent = ({
  data,
  options,
  cssClasses,
}: IDoughnutChartComponentProps) => {
  return (
    <section className={cssClasses}>
      <Doughnut data={data} options={options} />
    </section>
  );
};

export default DoughnutChartComponent;

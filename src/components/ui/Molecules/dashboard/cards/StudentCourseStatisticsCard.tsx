import { Separator } from "@/components/custom/separator";
import DoughnutChartComponent from "../charts/DoughnutChart";
import { ChartOptions } from "chart.js";
import { ICourseStatisticsProps } from "@/types";

const StudentCourseStatisticsCard = ({
  successRate,
  totalExams,
  totalExamsTaken,
  totalPass,
}: ICourseStatisticsProps) => {
  // chart data
  const data = {
    labels: ["Total Exams", "Exams Taken", "Total Pass"],
    datasets: [
      {
        label: "Count: ",
        data: [totalExams, totalExamsTaken, totalPass],
        backgroundColor: [
          "rgba(0, 229, 154, 1)",
          "rgba(175, 164, 240, 1)",
          "rgb(243, 36, 3, 1)",
        ],
        borderColor: [
          "rgba(0, 229, 154, 1)",
          "rgba(175, 164, 240, 1)",
          "rgb(243, 36, 3, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // chart options
  const options: ChartOptions<"doughnut"> = {
    plugins: {
      legend: {
        display: false, // Disable the legend
      },
      tooltip: {
        usePointStyle: true,
      },
    },
    elements: {
      arc: {
        borderWidth: 1, // This controls the border width of the segments
      },
    },
    cutout: "80%", // Adjust this value to change the thickness
  };

  return (
    <div className="col-span-1 tablet:col-span-6 w-auto lg:w-auto  bg-[#434055] rounded-[20px] relative">
      <h3 className=" pt-[2.37rem] pl-[2.25rem] text-[1rem] font-bold leading-[129%]">
        Course Statistics
      </h3>
      <div className="tablet:flex tablet:justify-between">
        <div className="grid grid-cols-2 tablet:grid-cols-1 gap-[1.44rem] tablet:gap-[0.75rem] pl-[1.69rem] tablet:pl-[2.25rem] pr-[2.06rem] pt-[2.25rem] tablet:pt-[0.94rem]">
          <div className=" tablet:flex tablet:justify-between tablet:gap-[0.75rem] ">
            <span className="text-[0.875rem] leading-[129%] text-[#C2C2FF] font-inter">
              Total Exam
            </span>
            <span className="font-bold text-[0.875rem] tracking-[0.04375rem]  font-inter">
              {totalExams}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[0.875rem] leading-[129%] text-[#C2C2FF] font-inter">
              Exams Taken
            </span>
            <span className=" font-bold  text-[0.875rem]  tracking-[0.04375rem] font-inter">
              {totalExamsTaken}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[0.875rem] leading-[129%] text-[#C2C2FF] font-inter">
              Total Pass
            </span>
            <span className="font-inter font-bold tracking-[0.04375rem] text-[0.875rem]">
              {totalPass}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[0.875rem] leading-[129%] text-[#C2C2FF] font-inter">
              Sucess Rate
            </span>
            <span className="font-inter font-bold tracking-[0.04375rem] text-[0.875rem] tablet:pl-4">
              {successRate}%
            </span>
          </div>
        </div>
        <Separator
          orientation="vertical"
          className="bg-card-seperator hidden tablet:block h-[11.5rem] absolute top-[1.81rem] left-[12rem] tablet:left-[14.5rem]"
        />
        <DoughnutChartComponent
          cssClasses="flex justify-center items-center py-[2.75rem] px-[5rem] tablet:px-[2rem]  tablet:py-0 tablet:w-[45%]"
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default StudentCourseStatisticsCard;

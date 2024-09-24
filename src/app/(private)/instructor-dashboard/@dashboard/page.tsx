import OverviewCard from "@/components/ui/Molecules/dashboard/OverviewCard";
import FileIcon from "@/assets/icons/file_icon.svg";
import RegisteredUserIcon from "@/assets/icons/registered_user_icon.svg";
import RegisteredInstructorIcon from "@/assets/icons/add_remove_instructor_icon.svg";
import ExamsCreatedIcon from "@/assets/icons/course_list_icon.svg";
import DoughnutChart from "@/components/ui/Molecules/dashboard/charts/DoughnutChart";
import Heading from "@/components/ui/Atoms/Heading";
import AverageGradeBarChart from "@/components/ui/Molecules/dashboard/charts/AverageGradeBarChart";
import AdImageOne from "@/assets/images/adsDummyImages/Rectangle 2901.png";
import AdImageTwo from "@/assets/images/adsDummyImages/Rectangle 2902.png";
import type { Metadata } from "next";
import {
  averageGradeBarChartData,
  performanceMetricsBarChartData,
} from "@/mappings";
import PerformanceMetricsChart from "@/components/ui/Molecules/dashboard/charts/PerformanceMetricsChart";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Instructor Dashboard",
  description: "Instructor Dashboard",
};

const InstructorDashboardOverview = () => {
  return (
    <div className="flex justify-between w-full gap-[1.5rem] relative">
      <div>
        <Heading
          heading="Overview"
          className="text-[1.875rem] font-bold leading-[115%]"
        />
        {/* top section */}
        <div className="flex gap-[1.25rem] mt-[2.19rem]">
          {/* overview cards section */}
          <div className="flex flex-col  gap-[1.25rem]">
            <div className="flex gap-[1.25rem]">
              <OverviewCard
                icon={FileIcon}
                number={6}
                text="Total Courses"
                circleColor="bg-app-orange"
              />
              <OverviewCard
                icon={RegisteredUserIcon}
                number={25}
                text="Registered Students"
                circleColor="bg-rating-star-color"
              />
              <OverviewCard
                icon={RegisteredInstructorIcon}
                number={100}
                text="Exams Created"
                circleColor="bg-app-purple"
              />
            </div>
          </div>
        </div>

        {/* performance metrics chart */}
        <div className="bg-top-flashcards-card-background rounded-[1.25rem] relative">
          <Heading
            heading="Performance Metrics"
            className="text-[0.875rem] font-semibold font-inter absolute top-[1.87rem] left-[1.25rem]"
          />
          {/* legends for performance metric chart */}
          <div className="flex gap-[0.75rem] absolute top-[1.8rem] right-[2.13rem]">
            <div className="flex gap-[0.75rem]  items-center">
              <span className="text-[0.5625rem] font-medium">GRADE</span>
              <div className="w-[1rem] h-[1rem] bg-badge-background rounded-full"></div>
            </div>
            <div className="flex gap-[0.75rem]  items-center">
              <span className="text-[0.5625rem] font-medium">STUDENTS</span>
              <div className="w-[1rem] h-[1rem] bg-[#8081C9] rounded-full"></div>
            </div>
          </div>
          <div className=" px-[1.25rem] mt-[1.5rem] py-[2.16rem]">
            <PerformanceMetricsChart data={performanceMetricsBarChartData} />
          </div>
        </div>
      </div>
      <div>
        <Image className="h-[35.875rem]" src={AdImageOne} alt="ad image" />
        <Image
          className="h-[21.9375rem] mt-[1.69rem]"
          src={AdImageTwo}
          alt="ad image"
        />
      </div>
    </div>
  );
};

export default InstructorDashboardOverview;

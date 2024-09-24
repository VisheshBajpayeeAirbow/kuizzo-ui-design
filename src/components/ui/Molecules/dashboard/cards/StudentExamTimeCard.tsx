import ProgressGauge from "@/components/ui/Atoms/ProgressGauge";
import { Separator } from "@/components/custom/separator";
import { ITimingDetailsProps } from "@/types";
import { convertTimeToStringFormat } from "@/utils";

const StudentExamTimeCard = ({ timeTaken, totalTime }: ITimingDetailsProps) => {
  return (
    <div className="col-span-1 tablet:col-span-6  bg-input-background rounded-[20px] relative pb-[2rem]">
      <h3 className=" pt-[2.69rem] pl-[1.87rem] text-[1rem] font-bold leading-[129%] font-inter">
        Exam Time
      </h3>
      <div className="flex tablet:flex-col justify-between tablet:justify-start gap-[1.44rem]  px-[1.87rem] pt-[2.5rem] tablet:pt-[2rem]">
        <div className="flex flex-col gap-[0.69rem]">
          <span className=" text-[0.875rem] leading-[129%] text-[#C2C2FF] font-inter">
            Total Time
          </span>
          <span className=" font-bold tracking-[0.04375rem] text-[0.875rem]">
            {convertTimeToStringFormat(totalTime)}
          </span>
        </div>
        <div className="flex flex-col gap-[0.69rem]">
          <span className=" text-[0.875rem] leading-[129%] text-[#C2C2FF] font-inter">
            Time Taken
          </span>
          <span className="font-bold tracking-[0.04375rem] text-[0.875rem]">
            {convertTimeToStringFormat(timeTaken)}
          </span>
        </div>
      </div>
      {/* mobile separator */}
      <div className="px-[1.87rem] pt-[2.12rem] pb-[2.5rem] tablet:hidden">
        <Separator orientation="horizontal" className="bg-card-seperator" />
      </div>
      {/* desktop separator */}
      <div className=" hidden tablet:block">
        <Separator
          orientation="vertical"
          className="bg-card-seperator h-[11.5rem] absolute top-[1.81rem] left-[12rem] tablet:left-[13rem]"
        />
      </div>
      <ProgressGauge
        progress={Number(timeTaken.split(":").join("."))}
        maxTime={Number(totalTime.split(":").join("."))}
        extraClasses="pb-[3.25rem] tablet:pb-0 tablet:absolute top-[3.5rem] right-[3.5rem]"
      />
    </div>
  );
};

export default StudentExamTimeCard;

import Image from "next/image";
import GradiantImage from "@/assets/images/institution_hero_gradiant.svg";
import { IDashboardLayoutProps } from "@/types";

const StudentDashboardLayout = ({
  children,
  header,
  sidebar,
  dashboard,
}: IDashboardLayoutProps) => {
  return (
    <div className="mx-auto w-[90%] lg:w-[1400px]">
      <Image
        className="absolute right-0 top-0 -z-10"
        src={GradiantImage}
        alt="gradiant-image"
      />
      <div>{header}</div>
      <div className="md:flex md:justify-between mt-[4.75rem] gap-[1.62rem]">
        {/* sidebar of dashboard */}
        <aside>{sidebar}</aside>
        {/* center content of the dashboard */}
        <section className="w-full">{dashboard}</section>
        {/* right side of the dashboard */}
        <section>{children}</section>
        {/* create assessment card */}
      </div>
      {/* for now this card is commented out because some dashboard pages dont have this carvd in them, hence it should be placed somewhere other than layout section */}
      {/* <div className="rounded-[0.9375rem] bg-top-flashcards-card-background w-[63rem] h-[21.375rem] flex-shrink-0 mt-[2.88rem] ml-[16rem] lg:ml-[19rem] mb-[4.75rem] relative">
        <Image
          className="absolute top-[2.75rem] left-[4.06rem]"
          src={GenerateNewAssessmentImage}
          alt="image"
        />
        <Image
          className="absolute top-[4.38rem] left-[17.38rem]"
          src={GenerateNewAssessmentImageSecondary}
          alt="image"
        />
        <h1 className="font-caladea text-[1.875rem] font-bold leading-[115%] absolute right-[3.62rem] top-[4.06rem] text-heading">
          AI Tools for{" "}
          <span className="text-app-orange">Quizzes and Exams</span>
        </h1>
        <p className="text-sub-heading absolute top-[8.63rem] w-[26.5625rem] right-[3.5rem]">
          Access Al tools to automatically generate assessments based on your
          course content
        </p>
        <Button
          className="w-[18.375rem] absolute bottom-[4.81rem] right-[12.44rem]"
          btnColor="orange"
        >
          Generate New Assessment
        </Button>
      </div> */}
    </div>
  );
};

export default StudentDashboardLayout;

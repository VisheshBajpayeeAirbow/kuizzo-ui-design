import CardExploreSubjects from "@/components/ui/Molecules/CardExploreSubjects";
import React from "react";
import Heading from "@/components/ui/Atoms/Heading";
import ScienceIcon from "@/assets/icons/science_icon.svg";
import LanguageIcon from "@/assets/icons/language_icon.svg";
import SocialStudiesIcon from "@/assets/icons/social_studies_icon.svg";
import BusinessIcon from "@/assets/icons/business_icon.svg";
import MathsIcon from "@/assets/icons/maths_icon.svg";
import EngineeringIcon from "@/assets/icons/engineering_icon.svg";

const ExploreSubjectsSection = () => {
  return (
    <section className=" md:w-[90%] lg:w-[1400px] md:mx-auto">
      <div className="flex flex-col  items-center  pt-[3.94rem]  md:pt-[8rem] gap-[0.94rem] md:gap-[1.56rem] ">
        <Heading
          heading=" Explore Subjects"
          className="text-[2.1875rem] md:text-[3.125rem] font-bold leading-[115%] text-heading"
        />
        <p className="text-sub-heading md:text-[1.5625rem] text-nowrap">
          Click on the categories and explore all courses
        </p>
      </div>

      <div className="grid grid-cols-2 px-[1.69rem] md:px-0 gap-[1.07rem] content-center md:flex md:justify-center lg:justify-center md:gap-[1.75rem] mt-[3.93rem] md:mt-[5.06rem] mb-[3.69rem] md:mb-[7.38rem]">
        <CardExploreSubjects
          cardIcon={ScienceIcon}
          iconBgColor="bg-app-blue"
          title="Science"
        />
        <CardExploreSubjects
          cardIcon={EngineeringIcon}
          iconBgColor="bg-[#FAB437]"
          title="Engineering"
        />
        <CardExploreSubjects
          cardIcon={LanguageIcon}
          iconBgColor="bg-[#F45E52]"
          title="Language"
        />
        <CardExploreSubjects
          cardIcon={SocialStudiesIcon}
          iconBgColor="bg-app-green"
          title="Social Studies"
        />
        <CardExploreSubjects
          cardIcon={BusinessIcon}
          iconBgColor="bg-app-blue"
          title="Business"
        />
        <CardExploreSubjects
          cardIcon={MathsIcon}
          iconBgColor="bg-app-purple"
          title="Math"
        />
      </div>
    </section>
  );
};

export default ExploreSubjectsSection;

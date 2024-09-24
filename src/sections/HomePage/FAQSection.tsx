import Heading from "@/components/ui/Atoms/Heading";
import Accordian from "@/components/ui/Molecules/Accordian";
import { nanoid } from "nanoid";
import SemiCircle from "@/assets/images/home_page_faq_semicircle.svg";
import Image from "next/image";
import { accordianData } from "@/mappings";
const FAQSection = () => {
  return (
    <section className="relative md:mx-auto md:w-[80.5%] lg:w-[1400px]">
      <Image
        src={SemiCircle}
        alt="semicircle"
        className="absolute right-[-2rem] top-[7rem] hidden md:block"
      />
      <div className="flex flex-col gap-[2.12rem] md:gap-[1.37rem] justify-center items-center mt-[5.19rem] md:mt-[7.37rem]">
        <Heading
          heading="Frequently Asked Questions"
          className="text-[2.1875rem] leading-[115%] md:text-[50px] font-semibold text-center text-heading"
        />
        <p className="text-sub-heading text-nowrap md:text-[1.5625rem] leading-[150%] mt-[-16px]">
          We thought you might have some questions...
        </p>
      </div>

      <div className="mt-[3.94rem] md:mt-[1rem]">
        <Accordian data={accordianData} />
      </div>
    </section>
  );
};

export default FAQSection;

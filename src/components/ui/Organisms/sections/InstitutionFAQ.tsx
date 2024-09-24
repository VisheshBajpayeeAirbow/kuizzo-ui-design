import Heading from "@/components/ui/Atoms/Heading";
import Accordian from "@/components/ui/Molecules/Accordian";
import { nanoid } from "nanoid";
import SemiCircle from "@/assets/images/home_page_faq_semicircle.svg";
import Image from "next/image";
import { IInstitutionFaqProps } from "@/types";
const InstitutionFAQ = (props: IInstitutionFaqProps) => {
  const { data } = props;
  return (
    <section className="relative mx-auto w-[90%] lg:w-[1400px] mt-[3.68rem] md:mt-0">
      <Image
        src={SemiCircle}
        alt="semicircle"
        className="absolute right-28 top-28 hidden md:block"
      />
      <div className="flex flex-col justify-center items-center gap-[1.38rem]">
        <Heading
          heading="Frequently Asked Questions"
          className="text-[2.1875rem] md:text-[3.125rem] font-semibold text-center text-heading md:mt-[8.13rem]"
        />
        <p className="text-sub-heading text-wrap text-center  md:text-[20px]">
          We thought you might have some questions...
        </p>
      </div>

      <div className="w-full mt-[5rem] mb-[4.94rem]">
        <Accordian data={data} />
      </div>
    </section>
  );
};

export default InstitutionFAQ;

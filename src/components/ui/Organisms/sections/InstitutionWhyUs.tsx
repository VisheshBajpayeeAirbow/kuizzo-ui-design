"use client";
import { IInstitutionWhyUsProps } from "@/types";
import Heading from "../../Atoms/Heading";
import CountUp from "react-countup";
import HeroGradiant from "@/assets/images/gradiant_ellipse.svg";
import Image from "next/image";
import { nanoid } from "nanoid";
const InstitutionWhyUs = (props: IInstitutionWhyUsProps) => {
  const { disableGradient, data } = props;
  console.log("WHY US DATA: ", data);
  return (
    <section className="lg:w-[1400px] md:w-[90%] md:mx-auto py-16 relative">
      {/* {!disableGradient && (
        <Image
          src={HeroGradiant}
          alt="institution-hero-gradiant"
          className="absolute  rotate-180"
        />
      )} */}
      <div className="flex flex-col items-center gap-4 md:py-12">
        <Heading
          heading="Why Us"
          className="text-[35px] md:text-[50px] font-semibold text-heading"
        />
        <p className="text-sub-heading md:text-[25px] text-nowrap">
          Why we are the best
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:justify-center gap-4 my-6">
        {data?.map(({ heading, number }, index) => {
          return (
            <div
              key={nanoid()}
              className="flex flex-col md:flex-row justify-center items-center"
            >
              <CountUp
                className="text-[35px] md:text-[70px]  text-heading font-caladea"
                end={number}
                duration={5}
              />
              <p className="text-[20px] text-sub-heading md:ml-4">{heading}</p>
              {/* line */}
              {index !== 2 && (
                <div className="mt-6 bg-[#AFA4F04D] h-[1px] w-1/2 md:h-16 md:w-[1px]  md:ml-4"></div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default InstitutionWhyUs;

"use client";
import React from "react";
import Heading from "../../Atoms/Heading";
import Image from "next/image";

import { IInstitutionAboutUsProps } from "@/types";
import ScrollToTop from "react-scroll-to-top";
import { IoArrowUpCircleOutline } from "react-icons/io5";
const InstitutionAboutUs = (props: IInstitutionAboutUsProps) => {
  const { aboutInfo, images, title } = props;
  console.log("ABOUT US PROPS: ", props);
  const ImgOne = images && images[0];
  const ImgTwo = images && images[1];

  return (
    <section className=" bg-background h-full gap-4 md:rounded-tr-[100px] md:rounded-bl-[100px] pb-[2rem] z-10">
      <div className="lg:w-[1400px] md:w-[90%] md:mx-auto">
        {/* mobile about us */}
        <div className="md:hidden flex flex-col mt-[3.69rem]">
          <div className="flex flex-col justify-center items-center mt-5 gap-8">
            <Image
              width={320}
              height={320}
              className="rounded-[20px]"
              src={ImgOne}
              alt="about-us-1"
            />
            <Image
              width={320}
              height={320}
              className="rounded-[20px]"
              src={ImgOne}
              alt="about-us-1"
            />
          </div>
          <div className="flex items-center mt-8 justify-center flex-col px-8  mb-[4.19rem]">
            <Heading
              heading={title}
              className="text-[35px] md:text-[50px] font-semibold text-heading"
            />
            <p className="text-sub-heading md:text-[25px]">{aboutInfo}</p>
          </div>
        </div>
        {/* desktop about us */}
        <div className="hidden md:flex gap-[4.5rem] relative mb-[4.95rem] ">
          <div className="w-1/3 flex flex-col gap-[1.87rem]  md:mt-[5.62rem]">
            <Image
              width={300}
              height={300}
              className="rounded-[20px] h-[21.8125rem] w-[21.125rem]"
              src={ImgOne}
              alt="about-us-1"
            />
            <Image
              width={300}
              height={300}
              className="rounded-[20px] h-[21.8125rem] w-[21.125rem]"
              src={ImgTwo}
              alt="about-us-2"
            />
          </div>
          <div className="w-2/3 mt-[4.87rem] ">
            <Heading
              heading={title}
              className="text-[35px] md:text-[50px] font-semibold text-heading"
            />
            <p className="text-sub-heading md:text-[20px] text-center md:text-start mt-8">
              {aboutInfo}
            </p>
          </div>
        </div>
      </div>
      <ScrollToTop
        smooth
        style={{
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
        component={
          <IoArrowUpCircleOutline className="text-2xl text-app-purple hover:scale-[200%] transition ease-in-out duration-300 absolute right-0" />
        }
      />
    </section>
  );
};

export default InstitutionAboutUs;

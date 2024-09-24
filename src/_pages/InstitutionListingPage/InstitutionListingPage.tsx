"use client";

import React from "react";
import Footer from "@/components/ui/Molecules/Footer";
import Navbar from "@/components/ui/Molecules/Navbar/Navbar";
import { useGetAllInstitutions } from "@/server/queries";
import { nanoid } from "nanoid";
import Heading from "@/components/ui/Atoms/Heading";
import { Button } from "@/components";
import InstituteDetailsCard from "@/components/ui/Molecules/InstituteDetailsCard";
import InstitutionTestimonials from "@/components/ui/Organisms/sections/InstitutionTestimonials";
import InstitutionContactUs from "@/components/ui/Organisms/sections/InstitutionContactUs";
import ScrollToTop from "react-scroll-to-top";
import { testimonialsData } from "@/mappings";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import Spinner from "@/components/ui/Atoms/Spinner";

function InstitutionListingPage() {
  const {
    data: institutionsList,
    isLoading,
    isError,
    error,
  } = useGetAllInstitutions();
  if (isLoading) return <Spinner loadingText="Fetching Institutions" />;
  if (isError) return <div>ERROR OCCURED: {error.message}</div>;

  return (
    <div>
      <Navbar />
      <div className="bg-background tablet:rounded-tr-[6.25rem] tablet:rounded-bl-[6.25rem]">
        <div className="lg:w-[1400px] w-[90%] mx-auto ">
          {/* heading */}
          <Heading
            className="text-center text-[2.1875rem] md:text-[3.125rem] pt-[5.69rem] font-bold leading-[115%] fomt-bold"
            heading="Offerings for institutions"
          />
          {/* sub heading */}
          <p className="text-sub-heading text-[1rem] md:text-[1.5625rem] leading-[125%] mt-[1.25rem] text-center ">
            Get access to best-in-class, secured and seamless cloud-based
            solutions
          </p>
          {/* category buttons  */}
          <div className=" pt-[2.5rem] md:pt-[5.12rem] flex flex-col items-center tablet:flex-row md:justify-start tablet:justify-center gap-[1.25rem]">
            <Button
              btnColor="blue"
              className="w-[15.0625rem] h-[2.5rem] py-[0.31rem] px-[0.62rem] text-[1rem] leading-[125%] font-medium"
            >
              Platform Solutions
            </Button>

            <Button className="w-[15.0625rem] h-[2.5rem] py-[0.31rem] px-[0.62rem] text-[1rem] leading-[125%] font-medium bg-white text-[#444155]">
              Learning Programs
            </Button>

            <Button className="w-[15.0625rem] h-[2.5rem] py-[0.31rem] px-[0.62rem] text-[1rem] leading-[125%] font-medium bg-white text-[#444155]">
              Assessment Products
            </Button>
          </div>
          {/* card list */}
          {/* TODO:  need to change to institution data in future */}
          <div className="flex flex-col tablet:flex-row tablet:flex-wrap tablet:justify-center tablet:items-center  md:flex-row md:justify-start gap-[1.25rem] mt-[2.44rem] pb-[5rem] md:pb-[12.13rem]">
            {institutionsList?.map((institution) => (
              <InstituteDetailsCard
                key={nanoid()}
                instituteUrl={
                  institution?.pageContent?.heroSection.instituteUrl
                }
                heading={institution.pageContent?.heroSection.instituteName}
                description={
                  institution.pageContent?.heroSection.instituteDescription
                }
                id={institution.id}
                imageUrl={institution.pageContent?.heroSection.logo}
              />
            ))}
          </div>
        </div>
      </div>
      {/* <InstitutionCourses
        data={coursesWeOfferListStatic}
        disableBackground
        hasborderRadius
      /> */}
      <InstitutionTestimonials data={testimonialsData} />
      <InstitutionContactUs />
      <Footer />
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
    </div>
  );
}

export default InstitutionListingPage;

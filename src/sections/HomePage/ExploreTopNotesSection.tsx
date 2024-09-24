import { Button } from "@/components";
import Heading from "@/components/ui/Atoms/Heading";
import Card from "@/components/ui/Molecules/Card";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import SpiralArrow from "@/assets/images/home_page_top_notes_spiral_arrow.svg";
import Image from "next/image";
import NoteIcon from "@/assets/icons/note_icon.svg";

const ExploreSubjectsSectionOne = () => {
  return (
    <section className="bg-background md:px-0 md:rounded-tr-[100px] md:rounded-bl-[100px] pt-[5.3rem]">
      <div className="md:mx-auto md:w-[86%] lg:w-[1400px]">
        <div className="flex flex-col items-center gap-[1.56rem] md:flex-row  md:justify-between px-8 md:px-0">
          {/* heading and sub heading */}
          <div className="text-center md:text-start">
            <Heading
              className="text-[2.1875rem] md:text-[3.125rem] text-center md:text-left text-nowrap  font-bold text-heading leading-[115%]"
              heading="Explore top notes"
            />
            <p className="text-sub-heading text-[1rem] leading-[150%] mt-[0.94rem] md:mt-[9px] md:text-[1.5625rem]">
              Resources across various exams.
            </p>
          </div>
          {/* load more button and icon */}
          <div className="hidden md:flex md:items-center relative right-1">
            <Image
              src={SpiralArrow}
              alt="spiral-arrow"
              className="hidden md:block opacity-50"
            />
            <div className="ml-[26px]">
              <Button
                btnType="withIcon"
                btnColor="transparent"
                Icon={IoIosArrowDown}
                className=" border-2 rounded-[6.25rem] border-[#AFA4F0] py-[0.90rem] px-[2.2rem]"
              >
                Load More Notes
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-[1.69rem] md:px-0 gap-[1.94rem] md:items-start  md:flex-row pt-[3.56rem] md:pt-[4.87rem] md:pb-[6rem] md:gap-[1.56rem]">
          <Card
            cardType="subject"
            buttonColor="green"
            buttonText="Preview"
            footerText="Note"
            cardIconColor="bg-card-icon-background"
            cardIcon={NoteIcon}
            totalStars={4}
            totalReviews={1}
            badges={["Updated 123 days ago"]}
            title="Ut enim ad minima veniam, quis nostrum exercitation"
          />
          <Card
            cardType="subject"
            buttonColor="green"
            buttonText="Preview"
            footerText="Note"
            cardIconColor="bg-card-icon-background"
            cardIcon={NoteIcon}
            totalStars={4}
            totalReviews={1}
            badges={["Updated 123 days ago"]}
            title="Ut enim ad minima veniam, quis nostrum exercitation"
          />
          <Card
            cardType="subject"
            buttonColor="green"
            buttonText="Preview"
            footerText="Note"
            cardIconColor="bg-card-icon-background"
            cardIcon={NoteIcon}
            totalStars={4}
            totalReviews={1}
            badges={["Updated 123 days ago"]}
            title="Ut enim ad minima veniam, quis nostrum exercitation"
          />
          <Card
            cardType="subject"
            buttonColor="green"
            buttonText="Preview"
            footerText="Note"
            cardIconColor="bg-card-icon-background"
            cardIcon={NoteIcon}
            totalStars={4}
            totalReviews={1}
            badges={["Updated 123 days ago"]}
            title="Ut enim ad minima veniam, quis nostrum exercitation"
          />
        </div>
        <div className="w-full flex justify-center pt-[4.19rem] pb-[4.25rem] md:hidden">
          <div>
            <Button
              btnType="withIcon"
              btnColor="transparent"
              Icon={IoIosArrowDown}
              className=" border-2 border-[#AFA4F0]"
            >
              Load More Notes
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreSubjectsSectionOne;

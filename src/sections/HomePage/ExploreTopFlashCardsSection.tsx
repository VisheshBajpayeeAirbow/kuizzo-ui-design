"use client";
import { Button } from "@/components";
import Card from "@/components/ui/Molecules/Card";
import { IoIosArrowDown } from "react-icons/io";
import Heading from "@/components/ui/Atoms/Heading";
import Polygon from "@/assets/images/home_page_flahcard_polygon.svg";
import Image from "next/image";
import FlashCardIcon from "@/assets/icons/flashcard_icon.svg";
import { useTheme } from "next-themes";

const ExploreTopFlashCardsSection = () => {
  const { resolvedTheme } = useTheme();
  return (
    <section className="lg:w-[1400px] md:w-[90%] md:mx-auto relative">
      <div className="text-center pt-[3.56rem] md:pt-[7.62rem] md:text-start">
        <Heading
          className="text-[2.1875rem] leading-[115%] md:text-[50px] text-center md:text-left text-nowrap  font-semibold text-heading"
          heading="Explore top flashcards"
        />
        <p className="text-sub-heading text-[1rem] leading-[1.5rem] md:text-[1.5625rem] mt-[0.5rem]">
          Resources across various exams.
        </p>
      </div>
      <Image
        src={Polygon}
        alt="polygon"
        className="hidden md:block w-[8.33763rem] h-[5.15488rem] absolute top-[5.31rem] right-[7.51rem]"
      />
      <div className="flex flex-col md:flex-row gap-[1.88rem] md:gap-[1.56rem] px-[1.69rem] md:px-0  py-[3.56rem] md:py-0 md:pt-[4.31rem] md:pb-[6.94rem]">
        <Card
          cardType="explore-flashcard"
          title="Ut enim ad minima veniam, quis nostrum exercitation"
          badges={["45 Terms", "Updated 119 days ago"]}
          footerText="Flashcard"
          buttonColor="blue"
          buttonText="Preview"
          cardIcon={FlashCardIcon}
          cardIconColor={`${
            resolvedTheme === "dark" || resolvedTheme === undefined
              ? "bg-[#535374]"
              : "bg-app-green"
          }`}
          avatarImage="https://via.placeholder.com/150"
          totalStars={4}
          totalReviews={1}
        />
        <Card
          cardType="explore-flashcard"
          title="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          badges={["45 Terms", "Updated 119 days ago"]}
          footerText="Flashcard 1"
          buttonColor="blue"
          buttonText="Preview"
          cardIcon={FlashCardIcon}
          cardIconColor={`${
            resolvedTheme === "dark" || resolvedTheme === undefined
              ? "bg-[#535374]"
              : "bg-app-green"
          }`}
          avatarImage="https://via.placeholder.com/150"
          totalStars={5}
          totalReviews={123}
        />
        <Card
          cardType="explore-flashcard"
          title="Dolor in reprehenderit in voluptate velit esse cillum"
          badges={["45 Terms", "Updated 119 days ago"]}
          footerText="Flashcard 2"
          buttonColor="blue"
          buttonText="Preview"
          cardIcon={FlashCardIcon}
          cardIconColor={`${
            resolvedTheme === "dark" || resolvedTheme === undefined
              ? "bg-[#535374]"
              : "bg-app-green"
          }`}
          avatarImage="https://via.placeholder.com/150"
          totalStars={3}
          totalReviews={21}
        />
        <Card
          cardType="explore-flashcard"
          title="quis nostrud exer ullamco laboris niscoconsequat. "
          badges={["45 Terms", "Updated 119 days ago"]}
          footerText="Flashcard 3"
          buttonColor="blue"
          buttonText="Preview"
          cardIcon={FlashCardIcon}
          cardIconColor={`${
            resolvedTheme === "dark" || resolvedTheme === undefined
              ? "bg-[#535374]"
              : "bg-app-green"
          }`}
          avatarImage="https://via.placeholder.com/150"
          totalStars={4.5}
          totalReviews={222}
        />
      </div>

      <div className="w-full flex md:hidden justify-center pb-[4.5rem]">
        <div>
          <Button
            btnType="withIcon"
            btnColor="transparent"
            Icon={IoIosArrowDown}
            className=" border-2 border-[#AFA4F0]"
          >
            Load More Flashcards
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExploreTopFlashCardsSection;

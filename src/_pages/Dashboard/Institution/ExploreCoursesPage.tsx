"use client";

import { Button } from "@/components";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import Card from "@/components/ui/Molecules/Card";
import FormCardDashboard from "@/components/ui/Molecules/dashboard/cards/FormCardDashboard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/custom/carousel";
import { nanoid } from "nanoid";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import {
  TfiControlBackward,
  TfiControlSkipBackward,
  TfiControlSkipForward,
  TfiControlForward,
} from "react-icons/tfi";
import { useState } from "react";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 4;

const ExploreCoursesPage = () => {
  const { register, handleSubmit } = useForm();
  const examOptions = ["Exam 1", "Exam 2"];
  const courseOptions = ["Course 1", "Course 2", "Course 3"];
  const instituteOptions = ["Institute 1", "Institute 2"];
  const pathname = usePathname();

  const data = [
    {
      id: "21eqwfdgbhnj6y5terfsd",
      title: "CS EET",
      totalStars: 2,
      description:
        "A student who has got himself registered for Common Proficiency Test 60 days prior to the first day of the month in which examination is to be held can appear in the examination i.e. on or before 1st April and 1st October for appearing in CA FOUNDATION examination.",
      imageUrl:
        "https://images.pexels.com/photos/459403/pexels-photo-459403.jpeg",
    },
    {
      id: "12eq3rwgdfh6y5terfsd",
      title: "CA Foundation",
      totalStars: 4,
      description:
        "A student who has got himself registered for Common Proficiency Test 60 days prior to the first day of the month in which examination is to be held can appear in the examination i.e. on or before 1st April and 1st October for appearing in CA FOUNDATION examination.",
      imageUrl:
        "https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "12eq3rwgdfh6y5terfsd",
      title: "CA Foundation",
      totalStars: 4,
      description:
        "A student who has got himself registered for Common Proficiency Test 60 days prior to the first day of the month in which examination is to be held can appear in the examination i.e. on or before 1st April and 1st October for appearing in CA FOUNDATION examination.",
      imageUrl:
        "https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "12eq3rwgdfh6y5terfsd",
      title: "CA Foundation 2",
      totalStars: 4,
      description:
        "A student who has got himself registered for Common Proficiency Test 60 days prior to the first day of the month in which examination is to be held can appear in the examination i.e. on or before 1st April and 1st October for appearing in CA FOUNDATION examination.",
      imageUrl:
        "https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "12eq3rwgdfh6y5terfsd",
      title: "CA Foundation 3",
      totalStars: 4,
      description:
        "A student who has got himself registered for Common Proficiency Test 60 days prior to the first day of the month in which examination is to be held can appear in the examination i.e. on or before 1st April and 1st October for appearing in CA FOUNDATION examination.",
      imageUrl:
        "https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "12eq3rwgdfh6y5terfsd",
      title: "CA Foundation 4",
      totalStars: 4,
      description:
        "A student who has got himself registered for Common Proficiency Test 60 days prior to the first day of the month in which examination is to be held can appear in the examination i.e. on or before 1st April and 1st October for appearing in CA FOUNDATION examination.",
      imageUrl:
        "https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "12eq3rwgdfh6y5terfsd",
      title: "CA Foundation 6",
      totalStars: 4,
      description:
        "A student who has got himself registered for Common Proficiency Test 60 days prior to the first day of the month in which examination is to be held can appear in the examination i.e. on or before 1st April and 1st October for appearing in CA FOUNDATION examination.",
      imageUrl:
        "https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "12eq3rwgdfh6y5terfsd",
      title: "CA Foundation 5",
      totalStars: 4,
      description:
        "A student who has got himself registered for Common Proficiency Test 60 days prior to the first day of the month in which examination is to be held can appear in the examination i.e. on or before 1st April and 1st October for appearing in CA FOUNDATION examination.",
      imageUrl:
        "https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "12eq3rwgdfh6y5terfsd",
      title: "CA Foundation 7",
      totalStars: 4,
      description:
        "A student who has got himself registered for Common Proficiency Test 60 days prior to the first day of the month in which examination is to be held can appear in the examination i.e. on or before 1st April and 1st October for appearing in CA FOUNDATION examination.",
      imageUrl:
        "https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "12eq3rwgdfh6y5terfsd",
      title: "CA Foundation 8",
      totalStars: 4,
      description:
        "A student who has got himself registered for Common Proficiency Test 60 days prior to the first day of the month in which examination is to be held can appear in the examination i.e. on or before 1st April and 1st October for appearing in CA FOUNDATION examination.",
      imageUrl:
        "https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "12eq3rwgdfh6y5terfsd",
      title: "CA Foundation 9 ",
      totalStars: 4,
      description:
        "A student who has got himself registered for Common Proficiency Test 60 days prior to the first day of the month in which examination is to be held can appear in the examination i.e. on or before 1st April and 1st October for appearing in CA FOUNDATION examination.",
      imageUrl:
        "https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "12eq3rwgdfh6y5terfsd",
      title: "CA Foundation 10",
      totalStars: 4,
      description:
        "A student who has got himself registered for Common Proficiency Test 60 days prior to the first day of the month in which examination is to be held can appear in the examination i.e. on or before 1st April and 1st October for appearing in CA FOUNDATION examination.",
      imageUrl:
        "https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "12eq3rwgdfh6y5terfsd",
      title: "CA Foundation 11",
      totalStars: 4,
      description:
        "A student who has got himself registered for Common Proficiency Test 60 days prior to the first day of the month in which examination is to be held can appear in the examination i.e. on or before 1st April and 1st October for appearing in CA FOUNDATION examination.",
      imageUrl:
        "https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "12eq3rwgdfh6y5terfsd",
      title: "CA Foundation 12",
      totalStars: 4,
      description:
        "A student who has got himself registered for Common Proficiency Test 60 days prior to the first day of the month in which examination is to be held can appear in the examination i.e. on or before 1st April and 1st October for appearing in CA FOUNDATION examination.",
      imageUrl:
        "https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "12eq3rwgdfh6y5terfsd",
      title: "CA Foundation 13",
      totalStars: 4,
      description:
        "A student who has got himself registered for Common Proficiency Test 60 days prior to the first day of the month in which examination is to be held can appear in the examination i.e. on or before 1st April and 1st October for appearing in CA FOUNDATION examination.",
      imageUrl:
        "https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "12eq3rwgdfh6y5terfsd",
      title: "CA Foundation",
      totalStars: 4,
      description:
        "A student who has got himself registered for Common Proficiency Test 60 days prior to the first day of the month in which examination is to be held can appear in the examination i.e. on or before 1st April and 1st October for appearing in CA FOUNDATION examination.",
      imageUrl:
        "https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "12eq3rwgdfh6y5terfsd",
      title: "CA Foundation",
      totalStars: 4,
      description:
        "A student who has got himself registered for Common Proficiency Test 60 days prior to the first day of the month in which examination is to be held can appear in the examination i.e. on or before 1st April and 1st October for appearing in CA FOUNDATION examination.",
      imageUrl:
        "https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCourses = data.slice(startIndex, endIndex);
  const pageCount = Math.ceil(data.length / ITEMS_PER_PAGE);
  const pages = Array.from({ length: pageCount }, (_, i) => i);

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < data.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onSubmit = (data: any) => {
    console.log("EXPLORE PAGE SEARCH DATA: ", data);
    toast.success("Search Query Logged");
  };

  return (
    <>
      <FormCardDashboard
        fullWidthOnMediumDevices
        marginAuto
        headingTextSize="text-[1.125rem]"
        heading="Explore Courses"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="mb-[3rem]">
          <FormInput
            register={register}
            name="searchCourses"
            placeholder="Search Courses"
            inputType="withIcon"
            Icon={CiSearch}
          />
          <div className="flex flex-col space-y-4 tablet:space-y-0 tablet:flex-row tablet:space-x-4">
            <FormInput
              name="selectExam"
              placeholder="Select Exam"
              register={register}
              inputType="select"
              selectOptions={examOptions}
            />
            <FormInput
              name="selectCourse"
              placeholder="Select Course"
              register={register}
              inputType="select"
              selectOptions={courseOptions}
            />
            <FormInput
              name="selectInstitute"
              placeholder="Select Institute"
              register={register}
              inputType="select"
              selectOptions={instituteOptions}
            />
          </div>
          <Button btnColor="purple" className=" mt-[1.56rem]">
            Search
          </Button>
        </form>
      </FormCardDashboard>

      <div>
        <Carousel className="md:max-w-[66rem] lg:max-w-full">
          <CarouselContent>
            {currentCourses.map(
              ({ id, description, imageUrl, title, totalStars }) => (
                <CarouselItem
                  className="tablet:basis-1/3 lg:basis-1/4"
                  key={nanoid()}
                >
                  <Card
                    id={id}
                    avatarImage={imageUrl}
                    cardType="courses"
                    totalStars={totalStars}
                    title={title}
                    description={description}
                    redirectLink={pathname}
                  />
                </CarouselItem>
              )
            )}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center my-[2rem] tablet:my-[3.31rem]">
        <div className="flex justify-between items-center gap-[1.19rem] mt-4 rounded-full border border-input-text p-2">
          <button
            className="rounded-full bg-background p-2"
            onClick={() => setCurrentPage(0)}
            disabled={currentPage === 0}
          >
            <TfiControlBackward />
          </button>
          <button
            className="rounded-full bg-background p-2"
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
          >
            <TfiControlSkipBackward />
          </button>
          {pages.map((page) => (
            <button
              key={page}
              className={`${
                currentPage === page &&
                "bg-app-purple px-2 rounded-full flex items-center justify-center"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page + 1}
            </button>
          ))}
          <button
            className="rounded-full bg-background p-2"
            onClick={handleNextPage}
            disabled={endIndex >= data.length}
          >
            <TfiControlSkipForward />
          </button>
          <button
            className="rounded-full bg-background p-2"
            onClick={() => setCurrentPage(pageCount - 1)}
            disabled={currentPage === pageCount - 1}
          >
            <TfiControlForward />
          </button>
        </div>
      </div>
    </>
  );
};

export default ExploreCoursesPage;

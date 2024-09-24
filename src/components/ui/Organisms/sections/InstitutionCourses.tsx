"use client";
import Heading from "../../Atoms/Heading";
import Card from "../../Molecules/Card";
import { IInstitutionCoursesProps } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/custom/carousel";

import { nanoid } from "nanoid";
import { usePathname } from "next/navigation";
import { useGetCoursesByCourseIds } from "@/server/queries";

const InstitutionCourses = (props: IInstitutionCoursesProps) => {
  const { disableBackground, data } = props;
  const pathname = usePathname();

  const courseIds = data?.map((course) => course.courseId);
  const getCoursesByIdsQuery = useGetCoursesByCourseIds(courseIds);

  // Check if all queries are successful
  const isLoading = getCoursesByIdsQuery.some((query) => query.isLoading);
  const isError = getCoursesByIdsQuery.some((query) => query.isError);
  const courses = getCoursesByIdsQuery.map((query) => query.data?.course);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>There was an error loading the courses.</div>;
  }

  return (
    <section
      className={`${
        !disableBackground && "bg-background"
      } md:rounded-tr-[100px] md:rounded-bl-[100px] md:w-full relative pt-[5rem]`}
    >
      <div className="lg:w-[1400px] md:w-[90%] md:mx-auto">
        <div>
          <div className="flex flex-col items-center gap-[0.5rem] md:mb-8">
            <Heading
              heading="Courses We Offer"
              className="text-[1.875rem] md:text-[50px] font-semibold text-heading"
            />
            <p className="text-sub-heading text-center md:text-start text-[1.25rem] md:text-[25px]">
              We thought you might have some questions...
            </p>
          </div>

          <div className="my-[3.56rem]">
            <Carousel>
              <CarouselContent>
                {courses.map((course, index) => (
                  <CarouselItem
                    className="basis-3/4 md:basis-1/4 lg:basis-1/5"
                    key={nanoid()}
                  >
                    <Card
                      id={course.id}
                      cardType="courses"
                      title={course.courseName}
                      description={course.courseDescription}
                      redirectLink={pathname}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstitutionCourses;

"use client";
import StudentDashboardCard from "@/components/ui/Molecules/dashboard/cards/StudentDashboardCard";
import StudentDashboardCardTwo from "@/components/ui/Molecules/dashboard/cards/StudentDashboardCardTwo";
import AdImage from "@/assets/images/adsDummyImages/Rectangle 2855.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  TfiControlBackward,
  TfiControlForward,
  TfiControlSkipBackward,
  TfiControlSkipForward,
} from "react-icons/tfi";
import StudentDashboardCourseCard from "@/components/ui/Molecules/dashboard/cards/StudentDashboardCourseCard";
import { ICourseData, ICourseDataMany } from "@/types/api";

const ITEMS_PER_PAGE = 3;

const StudentOverviewPage = ({
  studentId,
  instituteId,
  studentCourseId,
  coursesData,
}: {
  studentId: string;
  instituteId: string;
  studentCourseId: string;
  coursesData: ICourseDataMany;
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [filteredCourses, setFilteredCourses] = useState<ICourseData[]>([]);

  const userCourses = coursesData?.courses.find(
    (course) => course.id === studentCourseId
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery === "") {
      setFilteredCourses(userCourses ? [userCourses] : []);
    } else {
      const lowercasedQuery = debouncedQuery.toLowerCase();
      const filtered = userCourses
        ? [userCourses].filter((course) =>
            course.courseName.toLowerCase().includes(lowercasedQuery)
          )
        : [];
      setFilteredCourses(filtered);
    }
    setCurrentPage(0); // Reset to the first page after search
  }, [debouncedQuery, userCourses]);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);
  const pageCount = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const pages = Array.from({ length: pageCount }, (_, i) => i);

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < filteredCourses.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-between gap-[1.62rem] ">
      {/* <pre>{JSON.stringify(userCourses, null, 2)}</pre> */}
      <div className="flex flex-col gap-[2.94rem] w-full">
        {/* dashboard main cards */}
        <div className="flex flex-col tablet:flex-row gap-[1.5rem] w-full">
          <StudentDashboardCard />
          <StudentDashboardCardTwo />
        </div>

        {/* course list cards and pagination */}
        <div>
          <div className="flex justify-between items-center mb-[2rem]">
            <h1 className="text-[1.875rem] leading-[115%] font-caladea font-bold">
              List of Courses
            </h1>
            <input
              type="text"
              placeholder="Search Courses"
              className="bg-input-background border-0 ring-0 rounded-md border-input-text outline-none focus:border-transparent focus:ring-0 mr-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-[1.31rem]">
            {currentCourses.length > 0 ? (
              currentCourses.map((course) => (
                <StudentDashboardCourseCard key={course.id} course={course} />
              ))
            ) : (
              <p className="text-2xl font-caladea">No courses found</p>
            )}
          </div>
          {/* pagination controls */}
          <div className="flex justify-center pt-[1rem] mb-[5.5rem]">
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
                disabled={endIndex >= filteredCourses.length}
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
        </div>
      </div>
      {/* ad image */}
      <Image
        className="h-1/2 hidden tablet:block"
        src={AdImage}
        alt="ad-image"
      />
    </div>
  );
};

export default StudentOverviewPage;

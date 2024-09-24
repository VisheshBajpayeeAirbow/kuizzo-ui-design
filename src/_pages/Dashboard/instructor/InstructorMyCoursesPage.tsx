"use client";
import { useState, useEffect } from "react";
import {
  TfiControlBackward,
  TfiControlSkipBackward,
  TfiControlSkipForward,
  TfiControlForward,
} from "react-icons/tfi";
import CoursesCard from "@/components/ui/Molecules/dashboard/cards/CoursesCard";
import { instructoriMyCoursesDummyData } from "@/mappings";
import Flashcard from "@/components/ui/Molecules/dashboard/cards/FlashCard";

const ITEMS_PER_PAGE = 6;

const InstructorMyCoursesPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [filteredCourses, setFilteredCourses] = useState(
    instructoriMyCoursesDummyData
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
      setFilteredCourses(instructoriMyCoursesDummyData);
    } else {
      const lowercasedQuery = debouncedQuery.toLowerCase();
      const filtered = instructoriMyCoursesDummyData.filter((course) =>
        course.name.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredCourses(filtered);
    }
    setCurrentPage(0); // Reset to the first page after search
  }, [debouncedQuery]);

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
    <div className="mb-[3.5rem]">
      <div className="flex justify-end items-center mb-[2rem]">
        <input
          type="text"
          placeholder="Search Courses"
          className="bg-input-background rounded-md border-input-text outline-none focus:border-transparent focus:ring-0 mr-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 tablet:grid-cols-3 gap-[1.31rem]">
        {currentCourses.length > 0 ? (
          currentCourses.map((course) => (
            <CoursesCard key={course.id} {...course} />
          ))
        ) : (
          <p className="text-2xl font-caladea">No courses found</p>
        )}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center pt-[1rem]">
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
      <Flashcard question="What is the capital of India?" answer="Delhi" />
    </div>
  );
};

export default InstructorMyCoursesPage;

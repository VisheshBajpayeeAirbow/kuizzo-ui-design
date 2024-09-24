"use client";
import React, { useState, useEffect, useRef } from "react";
import Heading from "../../Atoms/Heading";
import { IInstitutionTestimonialProps } from "@/types";
import Card from "../../Molecules/Card";
import { nanoid } from "nanoid";

const InstitutionTestimonials = ({ data }: IInstitutionTestimonialProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(3);
  const [totalSlides, setTotalSlides] = useState(0);
  const cardContainerRef = useRef<HTMLDivElement>(null); // Define the type of the ref

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerSlide(2);
      } else {
        setCardsPerSlide(3);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setTotalSlides(Math.ceil(data?.length / cardsPerSlide));
  }, [cardsPerSlide, data?.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const calculateTranslateX = () => {
    if (!cardContainerRef.current) return 0;
    const containerWidth = cardContainerRef.current.offsetWidth;
    return -(currentIndex * (containerWidth / totalSlides));
  };

  return (
    <div className="py-12 bg-background md:rounded-tr-[100px] md:rounded-bl-[100px]">
      <div className="flex flex-col items-center gap-4 mb-4 md:mb-8">
        <Heading
          heading="Testimonials"
          className="text-[35px] md:text-[50px] font-semibold text-heading"
        />
      </div>

      <div className="relative w-full flex items-center justify-center">
        <div
          className=" overflow-scroll md:overflow-hidden w-full"
          ref={cardContainerRef}
        >
          <div
            className="flex transition-transform duration-300 gap-4"
            style={{
              transform: `translateX(${calculateTranslateX()}px)`,
            }}
          >
            {data?.map((testimonial) => (
              <div key={nanoid()} className={`min-w-1/${cardsPerSlide}`}>
                <Card
                  avatarImage={testimonial.imageUrl}
                  cardType="testimonial-institution"
                  totalStars={testimonial.ratings}
                  title={testimonial.title}
                  testimonial={testimonial.testimonial}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="md:flex justify-center items-center mt-4 hidden">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 mx-1 rounded-full ${
              index === currentIndex
                ? "bg-input-icon w-5 h-5"
                : "bg-background-app"
            }`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default InstitutionTestimonials;

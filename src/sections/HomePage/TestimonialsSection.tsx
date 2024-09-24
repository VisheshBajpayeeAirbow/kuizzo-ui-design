"use client";
import { useEffect, useRef } from "react";
import Card from "@/components/ui/Molecules/Card";
import Heading from "@/components/ui/Atoms/Heading";
import Polygon from "@/assets/images/home_page-testimonials_polygon.svg";
import Image from "next/image";
import { testimonialsData } from "@/mappings";

const TestimonialsSection: React.FC = () => {
  const scrollContainerRef1 = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef2 = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollContainer1 = scrollContainerRef1.current;
    const scrollContainer2 = scrollContainerRef2.current;

    if (!scrollContainer1 || !scrollContainer2) return;

    let scrollAmount1 = 0;
    let scrollAmount2 =
      scrollContainer2.scrollWidth - scrollContainer2.clientWidth; // Start from the end
    let animationFrameId1: number;
    let animationFrameId2: number;

    const scroll1 = () => {
      scrollAmount1 += 1;
      if (
        scrollAmount1 >=
        scrollContainer1.scrollWidth - scrollContainer1.clientWidth
      ) {
        scrollAmount1 = 0;
      }
      scrollContainer1.scrollLeft = scrollAmount1;
      animationFrameId1 = requestAnimationFrame(scroll1);
    };

    const scroll2 = () => {
      scrollAmount2 -= 1; // Decrease the scroll amount to move from left to right
      if (scrollAmount2 <= 0) {
        scrollAmount2 =
          scrollContainer2.scrollWidth - scrollContainer2.clientWidth;
      }
      scrollContainer2.scrollLeft = scrollAmount2;
      animationFrameId2 = requestAnimationFrame(scroll2);
    };

    animationFrameId1 = requestAnimationFrame(scroll1);
    animationFrameId2 = requestAnimationFrame(scroll2);

    return () => {
      cancelAnimationFrame(animationFrameId1);
      cancelAnimationFrame(animationFrameId2);
    };
  }, []);

  return (
    <section className="min-h-auto bg-background md:min-h-screen w-full md:py-0 md:rounded-tr-[100px] md:relative">
      <Image
        src={Polygon}
        alt="polygon-testimonials"
        className="absolute right-[10.2rem] top-[5.5rem] hidden md:block"
      />
      <div className="flex flex-col items-center gap-[0.56rem] pt-[5.6rem]">
        <Heading
          heading="Testimonials"
          className="text-[2.1875rem] md:text-[50px] font-semibold text-heading leading-[115%]"
        />
        <p className="text-sub-heading text-[1rem] md:text-[1.5625rem] text-nowrap">
          What people say about us
        </p>
      </div>
      <div
        ref={scrollContainerRef1}
        className="overflow-x-auto whitespace-nowrap flex gap-[1rem] mt-[3.63rem] mb-[5.75rem] md:mb-0 md:mt-[6.31rem]"
        style={{ scrollbarWidth: "none" }}
      >
        {testimonialsData.map((data, index) => (
          <Card
            key={`homepage-testimonial-ltr-${index}`}
            avatarImage={data.imageUrl}
            cardType="testimonial"
            totalStars={data.ratings}
            title={data.title}
            testimonial={data.testimonial}
          />
        ))}
      </div>
      <div
        ref={scrollContainerRef2}
        className="overflow-x-auto whitespace-nowrap  gap-[1rem] mt-[1rem] pb-[5.56rem] hidden md:flex"
        style={{ scrollbarWidth: "none" }}
      >
        {testimonialsData.map((data, index) => (
          <Card
            key={`homepage-testimonial-rtl-${index}`}
            avatarImage={data.imageUrl}
            cardType="testimonial"
            totalStars={data.ratings}
            title={data.title}
            testimonial={data.testimonial}
          />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;

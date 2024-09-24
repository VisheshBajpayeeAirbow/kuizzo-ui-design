"use client";
import { IBlogDetailsCard } from "@/types";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import Button from "../Atoms/Button";

const BlogDetailsCard = ({
  id,
  heading,
  date,
  imageUrl,
  description,
  category,
}: IBlogDetailsCard) => {
  return (
    <div className="md:w-[16.875rem]  flex-shrink-0 rounded-[1.25rem] bg-card-background">
      {/* image */}
      <div className="flex justify-center">
        <div className="relative w-[90%] mx-auto md:mx-0 md:w-[15rem] h-[11.125rem] md:px-[0.94rem]  ">
          {" "}
          {/* Adjusted padding */}
          <Image
            className="rounded-[1.25rem] mt-[0.94rem]"
            fill
            sizes="(100vw) md:(100vw)"
            style={{ objectFit: "cover" }}
            src={imageUrl}
            alt={heading}
          />
        </div>
      </div>
      {/* heading */}
      <h1 className="mt-[1.94rem] px-[0.94rem] text-heading font-caladea text-[1.25rem] font-bold">
        {heading}
      </h1>
      {/* date */}
      <span className="mt-[0.67rem] text-[0.5rem] leading-[150%] font-normal pl-[0.94rem]">
        {date}
      </span>
      {/* description */}
      <p className="text-[0.625rem] text-subheading px-[0.94rem] mt-[0.64rem]">
        {description}
      </p>
      <Link href={`/blog-listing/${id}`}>
        <Button
          btnColor="blue"
          className="w-[5.75rem] px-[0.62rem] py-[0.31rem] text-[0.75rem] ml-[0.94rem] mt-[0.94rem] mb-[0.94rem]"
        >
          Read More
        </Button>
      </Link>
    </div>
  );
};

export default BlogDetailsCard;

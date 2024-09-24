"use client";
import React from "react";
import Heading from "@/components/ui/Atoms/Heading";
import { Button } from "@/components";
import { useRouter } from "next/navigation";
import ScrollToTop from "react-scroll-to-top";
import { IoArrowUpCircleOutline } from "react-icons/io5";
const BlogDetailsPage = ({ blogId }: { blogId: string }) => {
  const router = useRouter();

  const handleBackRoute = () => {
    router.back();
  };

  return (
    <div className="mx-auto w-[90%] lg:w-[1400px]">
      {/* heading */}
      <div className="flex justify-center md:justify-start mt-[2rem] md:mt-0">
        <Button
          onClick={handleBackRoute}
          href="/blog-details"
          className="bg-transparent md:rounded-[2.5rem] py-[0.75rem] text-heading border-app-purple px-[4.12rem] text-[1.375rem] leading-[1.5rem] border-[1px] w-[16.25rem]"
        >
          Back
        </Button>
      </div>
      {/* <Heading
        className="text-[35px] md:text-[50px] mt-[3.13rem]"
        heading={selectedBlog?.heading}
      /> */}
      {/* <span className="md:text-[1.25rem] leading-[150%] font-normal">
        {selectedBlog?.date}
      </span> */}
      {/* cover image */}
      {/* <div className=" w-full h-full md:w-[71.25rem] md:h-[31.25rem] md:mt-[3.12rem] relative">
        <Image
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          src={selectedBlog?.imageUrl}
          alt="blog-img"
        />
      </div> */}
      {/* description */}
      <div className="mt-8 md:w-[70.02156rem]">
        <p className="md:text-[1.25rem]">
          Chances are, you’ve come across a job posting (or two) that requires a
          bachelor’s degree, even if the responsibilities don’t align with that
          kind of education. That’s because employers typically set the
          standards around credentials. “Jobs do not require four-year
          degrees,”&nbsp;
          <span className="underline underline-offset-4">
            Harvard Business School
          </span>
          &nbsp;summarized in a recent report. “Employers do.”
        </p>
        <p className="mt-[1.25rem] md:text-[1.25rem]">
          Part of that preference has to do with the fact that companies with an
          educated workforce tend to have higher rates of productivity, per
          the&nbsp;
          <span className="underline underline-offset-4 ">
            Economic Policy Institute
          </span>
          . But when the{" "}
          <span className="underline underline-offset-4">
            average job posting receives around 118 applicants
          </span>
          , a degree can also be a way to narrow the applicant pool. It becomes
          a kind of shorthand. Manjari Raman, program director of Harvard
          Business School’s Managing the Future of Work, told&nbsp;BBC&nbsp;that
          “many companies [have taken] the easy route of using the four-year
          college degree as a proxy” for a particular ability or skill set.
        </p>
        {/* large heading */}
        <h5 className=" text-[1rem] md:text-[1.875rem]  mt-[3.13rem] font-caladea font-bold leading-[115%]">
          1. When you’re looking to either begin a career or pivot to a new one,
          what is your best option: a Professional Certificate or a degree?
        </h5>
        <p className="mt-[2rem] md:text-[1.25rem]">
          Part of that preference has to do with the fact that companies with an
          educated workforce tend to have higher rates of productivity, per the{" "}
          <span className="underline underline-offset-4 ">
            Economic Policy Institute
          </span>{" "}
          . But when the&nbsp;average job posting receives around 118
          applicants, a degree can also be a way to narrow the applicant pool.
          It becomes a kind of shorthand. Manjari Raman, program director of
          Harvard Business School’s Managing the Future of Work,
          told&nbsp;BBC&nbsp;that “many companies [have taken] the easy route of
          using the four-year college degree as a proxy” for a particular
          ability or skill set.
        </p>

        {/* small headings */}
        <h5 className="text-[1.5rem] mt-[3.13rem] font-caladea font-bold leading-[115%]">
          2. What should you earn: a certificate or a degree?
        </h5>
        <p className="mt-[1.25rem] md:text-[1.25rem]">
          Part of that preference has to do with the fact that companies with an
          educated workforce tend to have higher rates of productivity, per
          the&nbsp;
          <span className="underline underline-offset-4">
            Economic Policy Institute
          </span>
          .
        </p>
        <h5 className="text-[1.5rem] mt-[3.13rem] font-caladea font-bold leading-[115%]">
          2. What should you earn: a certificate or a degree?
        </h5>
        <p className="mt-[1.25rem] md:text-[1.25rem]">
          Part of that preference has to do with the fact that companies with an
          educated workforce tend to have higher rates of productivity, per
          the&nbsp;
          <span className="underline underline-offset-4">
            Economic Policy Institute
          </span>
          .
        </p>
        <h5 className="text-[1.5rem] mt-[3.13rem] font-caladea font-bold leading-[115%]">
          2. What should you earn: a certificate or a degree?
        </h5>
        <p className="mt-[1.25rem] md:text-[1.25rem]">
          Part of that preference has to do with the fact that companies with an
          educated workforce tend to have higher rates of productivity, per
          the&nbsp;
          <span className="underline underline-offset-4">
            Economic Policy Institute
          </span>
          .
        </p>
        <ul className="mt-[1.25rem] ml-6">
          <li className="list-disc leading-[170%]">
            Part of that preference has to do with the fact that companies with
            an educated workforce
          </li>
          <li className="list-disc leading-[170%]">
            Part of that preference has to do with the fact that companies with
            an educated workforce
          </li>
          <li className="list-disc leading-[170%]">
            Part of that preference has to do with the fact that companies with
            an educated workforce
          </li>
          <li className="list-disc leading-[170%]">
            Part of that preference has to do with the fact that companies with
            an educated workforce
          </li>
        </ul>
        <p className="mt-[1.25rem] leading-[150%]">
          Part of that preference has to do with the fact that companies with an
          educated workforce tend to have higher rates of productivity, per
          the&nbsp;Economic Policy Institute.
        </p>
      </div>
      {/* recommended blogs */}
      <div className="flex flex-col items-center space-y-[2rem] mt-4 md:mt-16 mb-8">
        <Heading
          className="text-[2rem] md:text-[3.125rem]"
          heading="Recommended Blogs"
        />
        {/* <div className="flex flex-col md:flex-row gap-[1.25rem] mb-[5rem]">
          {blogList?.map((blog: IBlogDetailsCard) => (
            <BlogDetailsCard key={nanoid()} {...blog} />
          ))}
        </div> */}
      </div>
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
};

export default BlogDetailsPage;

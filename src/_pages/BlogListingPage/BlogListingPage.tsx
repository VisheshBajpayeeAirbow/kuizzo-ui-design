"use client";
import { useState } from "react";
import SelectInput from "@/components/ui/Atoms/form/select/SelectInput";
import Heading from "@/components/ui/Atoms/Heading";
import BlogDetailsCard from "@/components/ui/Molecules/BlogDetailsCard";
import { IBlogDetailsCard } from "@/types";
import { nanoid } from "nanoid";
import FAQSection from "@/sections/HomePage/FAQSection";
import ScrollToTop from "react-scroll-to-top";
import { IoArrowUpCircleOutline } from "react-icons/io5";

const BlogListingPage = () => {
  // console.log("BLOG DATA: ", blogData);

  // const categories: string[] = [];
  // blogData?.forEach((blog: IBlogDetailsCard) => {
  //   if (blog.category && !categories.includes(blog.category)) {
  //     categories.push(blog.category);
  //   }
  // });

  // const [selectedCategory, setSelectedCategory] = useState<string>(
  //   categories[0]
  // ); // Ensure to explicitly type the state

  const [searchQuery, setSearchQuery] = useState<string>(""); // Explicitly type the state

  // const handleSelectChange = (selectedValue: string) => {
  //   setSelectedCategory(selectedValue);
  // };

  // const filteredBlogs: IBlogDetailsCard[] = blogData?.filter(
  //   (blog: IBlogDetailsCard) =>
  //     blog.category === selectedCategory &&
  //     blog.heading.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <>
      <div className="bg-background pb-[12.12rem] mt-8 md:rounded-tr-[6.25rem]">
        <div className="lg:w-[1400px] w-[90%] mx-auto">
          <Heading
            className="text-[35px] md:text-[3.125rem] pt-[2rem] md:pt-[5rem] font-semibold text-center text-heading"
            heading="Latest Blogs"
          />
          <p className="text-center text-sub-heading mt-[1.28rem] text-[20px] md:text-[1.5625rem]">
            Explore some of our most popular content and learn something new.
          </p>
          {/* search and filter */}
          <div className="flex flex-col md:flex-row  w-full md:mx-auto  md:px-0 md:w-1/2 mt-[2.93rem] gap-[1.25rem]">
            {/* <SelectInput
              id={"blog-category-select"}
              handleSelectChange={handleSelectChange} // Pass the correct handler
              options={categories}
            /> */}
            <input
              name="search"
              id="search"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Handle the input change directly
              className="rounded-[0.625rem] pt-[1.14rem] pb-[1.13rem] pl-[0.94rem] w-full border-input-border bg-input-background focus:border-transparent focus:ring-0"
            />
          </div>
          {/* blog cards section */}
          {/* <div className="flex flex-col  md:items-start md:flex-row flex-wrap gap-[1.25rem] mt-[2.27rem]">
            {filteredBlogs?.length === 0 ? (
              <div className="flex items-center justify-center w-full mt-8">
                <Heading heading="No blogs found" className="text-4xl" />
              </div>
            ) : (
              filteredBlogs?.map((blog: IBlogDetailsCard) => (
                <BlogDetailsCard
                  key={nanoid()}
                  date={blog.date}
                  description={blog.description}
                  heading={blog.heading}
                  id={blog.id}
                  imageUrl={blog.imageUrl}
                  category={blog.category}
                />
              ))
            )}
          </div> */}

          {/* accordian faq */}
        </div>
      </div>
      <FAQSection />
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
    </>
  );
};

export default BlogListingPage;

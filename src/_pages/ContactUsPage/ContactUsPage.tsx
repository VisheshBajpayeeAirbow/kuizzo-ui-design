"use client";
import Heading from "@/components/ui/Atoms/Heading";
import Accordian from "@/components/ui/Molecules/Accordian";
import { accordianData } from "@/mappings";
import Image from "next/image";
import React from "react";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import ScrollToTop from "react-scroll-to-top";

const ContactUsPage = () => {
  return (
    <div>
      <section className="py-12 md:px-4 bg-background-app lg:w-[1400px] md:w-[90%] md:mx-auto">
        <Heading
          className="text-[35px] md:text-[50px] font-semibold text-center text-heading"
          heading="Contact Us"
        />
        <div className="h-[300px] relative mt-8 mx-4 tablet:mx-0">
          <Image
            fill
            style={{ objectFit: "cover" }}
            className="rounded-[30px]"
            src={
              "https://images.pexels.com/photos/821754/pexels-photo-821754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt="contact-us-cover-img"
          />
        </div>
        <div className="mt-8 px-4 text-center md:text-start divide-y divide-[#7E7EAA80]">
          <p className="text-sub-heading md:text-center">
            Got questions on how to buy a car online or find affordable
            financing options? Don’t be shy, we’re here to assist you however
            you feel comfortable reaching out. Our Driveway agents are financing
            experts and can help craft a custom solution for your budget.
          </p>
          {/* phone section */}
          <div className="mt-8 pt-8 ">
            <h1 className="text-4xl font-semibold text-heading font-caladea">
              Phone
            </h1>
            <p className="text-sub-heading mt-4">
              If you have questions about your purchase, sale, or service, give
              us a call.
            </p>
            <div className="flex gap-4 justify-center md:justify-start mt-2 text-app-purple">
              <span className="underline underline-offset-2 font-semibold cursor-pointer hover:text-app-blue">
                09876543210
              </span>
              <span className="underline underline-offset-2 font-semibold cursor-pointer hover:text-app-blue">
                09876543210
              </span>
            </div>
            <div className="mt-4">
              <h1 className="text-heading">Business Hours are: </h1>
              <div className="flex flex-col gap-1 text-sub-heading mt-4">
                <p>Monday - Friday, 5:00 am – 8:00 pm PT.</p>
                <p>Saturday, 5:00 am – 7:00 pm PT.</p>
                <p>Sunday, 7:00 am – 7:00 pm PT.</p>
              </div>
              <p className="text-badge-text text-xs mt-4">
                Curious about something outside of business hours? Leave us a
                message and we’ll call you within the following day.
              </p>
            </div>
          </div>
          {/* email section */}
          <div className="mt-8 pt-8">
            <h1 className="text-4xl font-semibold text-heading font-caladea">
              Email
            </h1>
            <div>
              <h2 className="text-sub-heading mt-4">
                Have questions about navigating our site? Email us.{" "}
              </h2>
              <span className="font-semibold text-app-purple underline underline-offset-2 cursor-pointer">
                support@kuizzo.ai
              </span>
            </div>
          </div>

          {/* chat section */}
          <div className="mt-8 pt-8">
            <h1 className="text-4xl font-semibold text-heading font-caladea">
              Chat
            </h1>

            <div>
              <p className="text-sub-heading mt-4">
                Want to message with one of our agents?
              </p>
              <span className="font-semibold text-app-purple underline underline-offset-2 cursor-pointer">
                click here to initiate chat
              </span>
            </div>
          </div>
        </div>
        {/* faq section */}
        <div className="mt-8 pt-8  md:mt-[4.85rem]">
          <Heading
            heading="Frequently Asked Questions"
            className="text-heading text-[30px] md:text-[50px] text-center "
          />
          <Accordian data={accordianData} />
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
      </section>
      ;
    </div>
  );
};

export default ContactUsPage;

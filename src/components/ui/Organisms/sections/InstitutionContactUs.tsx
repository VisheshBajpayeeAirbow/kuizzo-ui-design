import React from "react";
import Heading from "../../Atoms/Heading";
import ContactUsForm from "../forms/ContactUsForm";

const InstitutionContactUs = () => {
  return (
    <div className=" mt-[7.31rem] lg:w-[1400px] w-[90%] mx-auto mb-[6.62rem]">
      <div className="flex flex-col items-center gap-[1.75rem] mb-4 md:mb-8">
        <Heading
          heading="Contact Us"
          className="text-[35px] md:text-[3.125rem] font-semibold text-heading"
        />
        <p className="text-sub-heading md:text-[1.5625rem] text-nowrap">
          Let us know your opinion
        </p>
      </div>
      {/* form */}
      <ContactUsForm />
    </div>
  );
};

export default InstitutionContactUs;

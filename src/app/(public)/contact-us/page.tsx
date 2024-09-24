import type { Metadata } from "next";
import React from "react";
import ContactUsPage from "@/_pages/ContactUsPage/ContactUsPage";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Us Page",
};

const ContactUs = () => {
  return <ContactUsPage />;
};

export default ContactUs;

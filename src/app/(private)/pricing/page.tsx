import PricingPage from "@/_pages/PricingPage/PricingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Pricing Page",
};

const Pricing = () => {
  return (
    <>
      <PricingPage />
    </>
  );
};

export default Pricing;

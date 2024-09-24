"use client";
import Heading from "@/components/ui/Atoms/Heading";
import PricingCard from "@/components/ui/Molecules/PricingCard";
import { toCapitalCase } from "@/utils";
import React from "react";
import {
  institutionPricing,
  instructorPricing,
  studentPricing,
} from "@/mappings";
import { useSession } from "next-auth/react";
import { nanoid } from "nanoid";
const PricingPage = () => {
  const session = useSession();

  // logged in role vased on the session
  const loggedInRole = session.data?.user.role;
  const selectPricingBasedOnType = () => {
    switch (loggedInRole) {
      case "student":
        return studentPricing;

      case "instructor":
        return instructorPricing;

      default:
        return institutionPricing;
    }
  };

  return (
    <div className="bg-background-app py-12 lg:w-[1400px] md:w-[90%] md:mx-auto">
      <Heading
        heading={`Pricing for ${loggedInRole && toCapitalCase(loggedInRole)}`}
        className="text-[2.1875rem] md:text-[4.375rem] text-heading text-center"
      />

      <div className="flex flex-col md:flex-row  gap-4 md:w-3/4 md:mx-auto mt-8 px-4">
        {selectPricingBasedOnType().map((pricingObj) => {
          return (
            <PricingCard
              key={nanoid()}
              pricingData={pricingObj}
              accent={loggedInRole}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PricingPage;

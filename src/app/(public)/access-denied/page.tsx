import Heading from "@/components/ui/Atoms/Heading";
import React from "react";

const AccessDenied = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Heading heading="Access Denied" className="text-5xl font-bold" />
    </div>
  );
};

export default AccessDenied;

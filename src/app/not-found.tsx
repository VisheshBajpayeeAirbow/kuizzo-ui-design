"use client";

import { Button } from "@/components";
import Heading from "@/components/ui/Atoms/Heading";
import { PATHS } from "@/constants";
import Link from "next/link";
import PageNotFoundImage from "@/assets/images/404.png";
import Image from "next/image";

const NotFoundApp = () => {
  return (
    <div
      className={`w-screen h-screen flex justify-center items-center bg-background-app`}
    >
      <div className="flex flex-col gap-8">
        <Heading
          className="text-4xl md:text-8xl text-heading animate-pulse"
          heading="Page Not Found!!"
        />
        <div className="flex justify-center items-center">
          <Image src={PageNotFoundImage} alt="Page not found" />
        </div>
        <div className="w-3/4 mx-auto">
          <Link href={PATHS.homePage}>
            <Button btnColor="purple">Go Back</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundApp;

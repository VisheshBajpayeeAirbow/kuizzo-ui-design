"use client";
import Heading from "@/components/ui/Atoms/Heading";
import DashboardIcon from "@/assets/icons/dashboard_icon.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { toCapitalCase } from "@/utils";
import { useEffect, useState } from "react";
import { getCourseByCourseId } from "@/server";

const Header = () => {
  const [courseHeader, setCourseHeader] = useState(false);
  const [header, setHeader] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const getHeader = async () => {
      const courseId = pathname.split("/").slice(-1)[0];
      const data = await getCourseByCourseId(courseId);
      setHeader(data.course.courseName);
    };

    if (pathname.split("/").slice(-1)[0].split("-")[0] === "course") {
      setCourseHeader(true);
      getHeader();
    } else {
      setCourseHeader(false);
    }
  }, [pathname]);

  return (
    <div className="hidden md:flex items-center justify-between h-[4.75rem] bg-app-green mt-[1.38rem] rounded-[0.625rem]">
      <Heading
        heading={
          courseHeader
            ? header // Use the state variable `header`
            : toCapitalCase(
                pathname.split("/").slice(-1)[0].split("-").join(" ")
              )
        }
        className="font-bold text-white text-[1.875rem] leading-[115%] pl-[2.5rem] py-[1.31rem]"
      />
      <Image
        className="flex-shrink-0 mr-[1.87rem]"
        src={DashboardIcon}
        alt="Dashboard Icon"
      />
    </div>
  );
};

export default Header;

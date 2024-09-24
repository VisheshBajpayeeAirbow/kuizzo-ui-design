"use client";
import Heading from "@/components/ui/Atoms/Heading";
import DashboardIcon from "@/assets/icons/dashboard_icon.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { toCapitalCase } from "@/utils";
const Header = () => {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex items-center justify-between h-[4.75rem] bg-app-orange mt-[1.38rem] rounded-[0.625rem] ">
      <Heading
        heading={toCapitalCase(
          pathname.split("/").slice(-1)[0].split("-").join(" ")
        )}
        className="font-bold text-white text-[1.875rem] leading-[115%] pl-[2.5rem] py-[1.31rem]"
      />
      <Image
        className="flex-shrink-0  mr-[1.87rem]"
        src={DashboardIcon}
        alt="Dashboard Icon"
      />
    </div>
  );
};

export default Header;

"use client";
import { PATHS } from "@/constants";
import { ISidebarNavigationButtonProps } from "@/types";
import { clearLocalStorageFormData } from "@/utils";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
const SidebarNavigationButton = (props: ISidebarNavigationButtonProps) => {
  const router = useRouter();
  const { image, text, link, noBorder, darkImage } = props;

  const pathname = usePathname();

  const handleNavigation = () => {
    if (link === "/logout") {
      // Sign out the user and redirect to the homepage
      signOut({
        redirect: true,
        callbackUrl: PATHS.homePage, // Use environment variable for flexibility
      });

      // Clear local storage after logging out to prevent data leakage between users
      clearLocalStorageFormData();
    } else {
      // Handle normal navigation
      router.push(link);
    }
  };

  const { resolvedTheme } = useTheme();
  const handleIsActiveLink = () => {
    if (pathname.includes(link)) {
      console.log("INCLUDES LINK: ", link, pathname);
      return true;
    } else {
      return false;
    }
  };

  return (
    <div
      onClick={handleNavigation}
      className={`flex items-center gap-[0.69rem] my-[0.88rem] pl-[1.44rem] pb-[0.87rem]  ${
        noBorder
          ? "border-0"
          : " border-b-[1px] border-dashboard-sidebar-border"
      } cursor-pointer`}
    >
      <div className="hover:translate-x-3 transition ease-in-out duration-300 flex gap-[0.69rem]">
        {resolvedTheme === "dark" || resolvedTheme === undefined ? (
          <Image
            width={100}
            height={100}
            style={{ height: "auto", width: "auto" }}
            src={darkImage}
            alt="overview icon"
          />
        ) : (
          <Image
            width={100}
            height={100}
            style={{ height: "auto", width: "auto" }}
            src={image}
            alt="overview icon"
          />
        )}
        <span
          className={`text-[0.75rem] ${
            link !== "/institution-dashboard" &&
            handleIsActiveLink() &&
            "font-extrabold"
          } `}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

export default SidebarNavigationButton;

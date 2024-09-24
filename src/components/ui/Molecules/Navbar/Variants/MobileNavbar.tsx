"use client";
import KuizzoMobileLogoLight from "@/assets/images/kuizzo-logo.png";
import KuizzoMobileLogoDark from "@/assets/images/kuizzo-logo-white.png";
import { PATHS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "../../../Atoms/ThemeToggle";
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
const MobileNavbar = () => {
  const [sidebarState, setSidebarState] = useState(false);
  const { resolvedTheme } = useTheme();
  const { data: session } = useSession();

  const handleSidebarToggle = () => {
    setSidebarState((prevState) => !prevState);
  };

  useEffect(() => {
    if (sidebarState) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [sidebarState]);

  return (
    <>
      <nav className="md:hidden flex justify-between bg-transparent px-[1.56rem] relative">
        <Link href={PATHS.homePage}>
          <Image
            className="absolute top-[0.5rem]"
            width={100}
            height={100}
            src={
              resolvedTheme === "dark" || resolvedTheme === undefined
                ? KuizzoMobileLogoDark
                : KuizzoMobileLogoLight
            }
            alt="mobile-logo"
          />
        </Link>
        <div className="flex justify-center items-center py-[1.62rem]  gap-[0.81rem]">
          <ThemeToggle role={session?.user.role} />
          <CiSearch
            className={`${
              resolvedTheme === "dark" || resolvedTheme === undefined
                ? "text-white"
                : "text-app-purple"
            } text-2xl`}
          />
          <RxHamburgerMenu
            onClick={handleSidebarToggle}
            className={`${
              resolvedTheme === "dark" || resolvedTheme === undefined
                ? "text-white"
                : "text-app-purple"
            } text-2xl`}
          />
        </div>
      </nav>
      <Sidebar
        handleSidebarToggle={handleSidebarToggle}
        sidebarState={sidebarState}
      />
    </>
  );
};

export default MobileNavbar;

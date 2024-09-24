"use client";
import KuizzoLogoLightMode from "@/assets/images/kuizzo_logo_light.svg";
import KuizzoLogoDarkMode from "@/assets/images/kuizzo_logo_dark.svg";
import { PATHS } from "@/constants";
import Image from "next/image";
import { desktopNavLinks } from "@/mappings";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { RiNotification3Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { RiDashboardLine } from "react-icons/ri";
import { nanoid } from "nanoid";
import { useSession } from "next-auth/react";
import Avatar from "../../../Atoms/Avatar";
import Button from "../../../Atoms/Button";
import { authRedirection, getAccentColorByRole } from "@/utils";
import SearchDialog from "../../SearchDialog";
import ThemeToggle from "@/components/ui/Atoms/ThemeToggle";

const DesktopNavbar = () => {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="hidden md:flex items-center md:justify-between bg-transparent lg:w-[1400px] md:w-[88%] md:mx-auto p-[0.88rem] z-20">
      <div className="flex items-center  gap-[2.19rem]">
        {/* logo */}
        <div>
          <Link href={PATHS.homePage}>
            <Image
              style={{ height: "auto", width: "auto" }}
              className="w-[9.73681rem] h-[5rem] shrink-0"
              src={
                resolvedTheme === "dark" || resolvedTheme === undefined
                  ? KuizzoLogoDarkMode
                  : KuizzoLogoLightMode
              }
              alt="logo"
            />
          </Link>
        </div>

        {/* navlinks */}
        <div>
          <div className="flex gap-[2rem] text-white">
            {desktopNavLinks.map(({ name, href }) => {
              const isActive = pathname === href;
              if (
                (session && name === "Blog") ||
                (session && name === "Contact Us") ||
                (session && name === "Institution") ||
                (!session && name === "Explore") ||
                (!session && name === "Exams")
              ) {
                return null;
              }

              if (session && name === "Home") {
                return (
                  <Link
                    key={nanoid()}
                    // this link url should be fetched dynamically based on the institute display name
                    href={"/BPA"}
                    className={`hover:text-app-purple font-inter text-[1.125rem] leading-[1.75rem] text-nowrap cursor-pointer  ${
                      isActive ? "text-app-purple" : "text-navbar-text"
                    }`}
                  >
                    {name}
                  </Link>
                );
              }
              return (
                <Link
                  key={nanoid()}
                  href={href}
                  className={`hover:text-app-purple font-inter text-[1.125rem] leading-[1.75rem] text-nowrap cursor-pointer  ${
                    isActive ? "text-app-purple" : "text-navbar-text"
                  }`}
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-[0.88rem]">
        {/* login */}
        <div>
          {/* theme switch */}
          {session?.user ? (
            <div className="flex items-center justify-between gap-[1.38rem]">
              {/* in future need to navigate based on the role */}
              <ThemeToggle role={session?.user.role} />
              {/* search input */}
              <SearchDialog />

              <Link href={authRedirection(session.user.role)}>
                <RiDashboardLine
                  className={`cursor-pointer text-2xl ${
                    pathname.includes("dashboard") &&
                    getAccentColorByRole(session?.user.role, "text")
                  }`}
                />
              </Link>
              <FaPlus
                className={`cursor-pointer text-white text-2xl ${getAccentColorByRole(
                  session?.user.role,
                  "background"
                )} rounded-full p-1`}
              />
              <RiNotification3Line className="cursor-pointer text-2xl" />

              <Avatar
                onClick={() => router.push("/institution-dashboard/profile")}
                image={
                  session?.user?.picture
                    ? session?.user?.picture
                    : "https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
              />
              <Button btnColor="purple" className="w-[9.875rem] h-[3.9375rem]">
                <Link href={PATHS.pricing}>Remove Ads</Link>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-[1.69rem]">
              <ThemeToggle role={session?.user.role} />

              <div className="flex items-center gap-4">
                <Link
                  href={PATHS.signin}
                  className="text-navbar-text cursor-pointer"
                >
                  Login
                </Link>
                <Button btnType="withIcon" btnColor="purple">
                  Get Started
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DesktopNavbar;

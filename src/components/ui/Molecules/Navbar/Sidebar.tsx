"use client";
import { mobileNavLinks } from "@/mappings";
import { ISidebarProps, ISublink } from "@/types";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { nanoid } from "nanoid";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { IoIosCloseCircleOutline, IoIosArrowDown } from "react-icons/io";
import Button from "../../Atoms/Button";
import { PATHS } from "@/constants";
import { AiOutlineLogout } from "react-icons/ai";

const Sidebar = ({ sidebarState, handleSidebarToggle }: ISidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { status } = useSession();

  const createPopups = (items: ISublink[]) => {
    return items.map(({ popupTitle, link, sublinks }) => (
      <Popover className="relative" key={nanoid()}>
        <PopoverButton
          onClick={() => {
            if (!sublinks) {
              router.push(link);
              handleSidebarToggle();
            }
          }}
          className="text-white hover:bg-purple-300 hover:text-black p-2 rounded-xl transition ease-in-out duration-300 flex items-center"
        >
          {popupTitle}
          {sublinks && <IoIosArrowDown className="ml-2" />}
        </PopoverButton>
        {sublinks && (
          <Transition
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel className="flex flex-col gap-2 bg-purple-600 p-4 rounded-xl mt-2">
              {createPopups(sublinks)}
            </PopoverPanel>
          </Transition>
        )}
      </Popover>
    ));
  };

  return (
    <>
      <div
        className={`h-screen fixed top-0 right-0 w-3/4 bg-background-app transition-transform duration-300 ease-in-out ${
          sidebarState ? "translate-x-0" : "translate-x-full"
        } z-50`}
      >
        <div className="w-full flex items-center justify-between p-4">
          <IoIosCloseCircleOutline
            onClick={handleSidebarToggle}
            className="text-app-purple text-2xl"
          />
          <AiOutlineLogout
            onClick={() => signOut()}
            className="text-heading text-2xl"
          />
        </div>
        {status === "authenticated" ? (
          <></>
        ) : (
          <div className="flex gap-[1rem] justify-center p-4">
            <Button
              onClick={() => router.push(PATHS.signin)}
              btnColor="purple"
              className="rounded-lg"
            >
              Signin
            </Button>
            <Button
              onClick={() => router.push(PATHS.signup)}
              btnColor="purple"
              className="rounded-lg"
            >
              Signup
            </Button>
          </div>
        )}

        <div className="flex flex-col gap-4 p-4">
          {mobileNavLinks.map(
            (link) =>
              (link.name !== "Dashboard" || status === "authenticated") && ( // Conditionally render the Dashboard section
                <Popover className="relative" key={nanoid()}>
                  <PopoverButton
                    className={`text-2xl flex items-center ${
                      pathname?.includes("pricing")
                        ? "text-app-purple font-semibold"
                        : "text-navbar-text"
                    }`}
                  >
                    {link.name}
                    {link.popup && (
                      <IoIosArrowDown className="ml-2 text-app-purple" />
                    )}
                  </PopoverButton>
                  {link.popup && (
                    <Transition
                      enter="transition ease-out duration-300"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <PopoverPanel className="flex flex-col gap-2 bg-app-purple p-4 rounded-xl mt-2">
                        {createPopups(link.popup)}
                      </PopoverPanel>
                    </Transition>
                  )}
                  {!link.popup && (
                    <Link href={link.link || "#"}>
                      <a
                        onClick={() => handleSidebarToggle()} // Ensure sidebar closes on link click
                        className={`text-2xl flex items-center ${
                          pathname === link.link
                            ? "text-app-purple font-semibold"
                            : "text-navbar-text"
                        } p-2 rounded-xl transition ease-in-out duration-300`}
                      >
                        {link.name}
                      </a>
                    </Link>
                  )}
                </Popover>
              )
          )}
        </div>
      </div>

      {/* overlay */}
      {sidebarState && (
        <div
          className="md:hidden fixed inset-0 min-h-screen backdrop-blur-lg duration-300 ease-in-out z-40"
          onClick={handleSidebarToggle}
        ></div>
      )}
    </>
  );
};

export default Sidebar;

"use client";

import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
// import Image from "next/image";
import { FiLoader } from "react-icons/fi";
import { getAccentColorByRole } from "@/utils";
export const ThemeToggle = ({
  role,
}: {
  role: "institution" | "student" | "instructor";
}) => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <FiLoader className="animate-spin" />;

  if (resolvedTheme === "dark") {
    return (
      <FiSun
        className={`text-xl cursor-pointer ${getAccentColorByRole(
          role,
          "text"
        )} hover:rotate-180 transition ease-in-out duration-1000`}
        onClick={() => setTheme("light")}
      />
    );
  }

  if (resolvedTheme === "light") {
    return (
      <FiMoon
        className="text-xl cursor-pointer hover:rotate-[360deg] transition ease-in-out duration-1000"
        onClick={() => setTheme("dark")}
      />
    );
  }
};

export default ThemeToggle;

"use client";
import { motion } from "framer-motion";
import { IProgressBarProps } from "@/types";
import { useEffect, useState } from "react";

const ProgressBar = ({
  progress,
  accent,
  extraClasses,
  maxValue,
}: IProgressBarProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust based on your mobile breakpoint
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set the initial state

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (progress > 100) progress = 100;

  const maxWidth = "17.4375rem";
  const maxWidthMobile = "14.4375rem";

  const barWidth = isMobile
    ? `${(progress / maxValue) * parseFloat(maxWidthMobile)}rem`
    : `${(progress / maxValue) * parseFloat(maxWidth)}rem`;

  return (
    <div className={`w-full rounded-r-full h-[0.9375rem] ${extraClasses}`}>
      <motion.div
        className={`${accent} h-[0.9375rem] rounded-r-full`}
        style={{ width: barWidth }}
        initial={{ width: 0 }}
        animate={{ width: barWidth }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
      />
    </div>
  );
};

export default ProgressBar;

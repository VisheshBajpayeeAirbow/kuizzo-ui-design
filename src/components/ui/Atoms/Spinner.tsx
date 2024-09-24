import { ISpinnerProps } from "@/types";
import { motion } from "framer-motion";

export const Spinner = ({ loadingText }: ISpinnerProps) => {
  const rings = [
    {
      size: "100%",
      colorSet: ["#9333EA", "#EC4899", "#3B82F6", "#10B981", "#F59E0B"],
      duration: 1.2,
      delay: 0,
      direction: "counterclockwise",
    },
    {
      size: "80%",
      colorSet: ["#3B82F6", "#F59E0B", "#9333EA", "#10B981", "#EC4899"],
      duration: 1.2,
      delay: 0.2,
      direction: "clockwise",
    },
    {
      size: "70%",
      colorSet: ["#10B981", "#F59E0B", "#EC4899", "#3B82F6", "#9333EA"],
      duration: 1.2,
      delay: 0.3,
      direction: "counterclockwise",
    },
    {
      size: "60%",
      colorSet: ["#F59E0B", "#9333EA", "#10B981", "#EC4899", "#3B82F6"],
      duration: 1.2,
      delay: 0.4,
      direction: "clockwise",
    },
    {
      size: "50%",
      colorSet: ["#9333EA", "#10B981", "#EC4899", "#F59E0B", "#3B82F6"],
      duration: 1.2,
      delay: 0.5,
      direction: "counterclockwise",
    },
    {
      size: "40%",
      colorSet: ["#10B981", "#3B82F6", "#F59E0B", "#EC4899", "#9333EA"],
      duration: 1.2,
      delay: 0.6,
      direction: "clockwise",
    },
    {
      size: "30%",
      colorSet: ["#F59E0B", "#9333EA", "#EC4899", "#10B981", "#3B82F6"],
      duration: 1.2,
      delay: 0.7,
      direction: "counterclockwise",
    },
    {
      size: "90%",
      colorSet: ["#EC4899", "#3B82F6", "#F59E0B", "#9333EA", "#10B981"],
      duration: 1.2,
      delay: 0.1,
      direction: "clockwise",
    },
    // additional rings
  ];

  //   specifics are provided here
  const createRingVariants = (
    duration: number,
    colorSet: string[],
    direction: string
  ) => ({
    rotate: {
      rotate:
        direction === "clockwise"
          ? [0, 360]
          : direction === "counterclockwise"
          ? [630, 0]
          : [0, -360],

      transition: {
        repeat: Infinity,
        duration: duration,
        ease: [0.68, -0.55, 1, 1.55], // Elastic easing for spin
      },
    },
    colorChange: {
      background: colorSet
        .map((color) => {
          return `gradient(from 90deg, transparent 50%, ${color} 50%))`;
        })
        .join(", "),
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "linear",
      },
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <motion.div className="relative flex h-60 w-60 items-center justify-center">
        {rings.map((ring, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full"
            style={{
              width: ring.size,
              height: ring.size,
              borderRadius: "",
              background: ring.colorSet[0],
              clipPath: "polygon(100% 50%, 60% 150%, 50% 200%, 200% 200%)",
            }}
            variants={createRingVariants(
              ring.duration,
              ring.colorSet,
              ring.direction
            )}
            animate={["rotate", "colorChange"]}
          />
        ))}
      </motion.div>
      <p className="text-3xl font-caladea">{loadingText}</p>
    </div>
  );
};

export default Spinner;

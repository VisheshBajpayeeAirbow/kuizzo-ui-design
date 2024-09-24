import { setActiveStep } from "@/features/courseSlice/courseSlice";
import { RootState } from "@/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  FaBook,
  FaList,
  FaClipboard,
  FaChalkboardTeacher,
} from "react-icons/fa";

export interface IStepperProps {
  mode: "create" | "edit";
}

const Stepper = ({ mode }: IStepperProps) => {
  const steps = [
    { name: "course", icon: FaChalkboardTeacher },
    { name: "subject", icon: FaBook },
    { name: "topic", icon: FaList },
    { name: "module", icon: FaClipboard },
  ];
  const dispatch = useDispatch();
  const handleStepChange = (
    step: "course" | "subject" | "module" | "topic"
  ) => {
    dispatch(setActiveStep(step));
  };

  const activeStep = useSelector((state: RootState) => state.course.activeStep);
  const activeIndex = steps.findIndex((step) => step.name === activeStep);

  return (
    <div className="relative w-full flex items-center my-8 ">
      <motion.div
        className="absolute top-1/2 left-5 h-1 bg-gray-200"
        style={{ transform: "translateY(-50%)", width: "calc(100% - 4rem)" }}
      >
        <motion.div
          className="h-1 bg-app-purple"
          initial={{ width: `${(activeIndex / (steps.length - 1)) * 101}%` }}
          animate={{ width: `${(activeIndex / (steps.length - 1)) * 101}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        />
      </motion.div>
      <div className="flex justify-between w-full">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isFirstStep = index === 0;
          const isLastStep = index === steps.length - 1;
          return (
            <div
              key={step.name}
              className="relative z-10 flex flex-col items-center"
            >
              {isFirstStep && (
                <motion.div className="h-1 bg-purple-500 w-0 absolute left-0 top-1/2 transform -translate-y-1/2" />
              )}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={` p-4  mt-[1rem] ${
                  activeIndex === index
                    ? "bg-app-purple rounded-full text-white"
                    : " text-white rounded-full bg-background-app"
                }`}
                // onClick={() =>
                //   handleStepChange(
                //     step.name as "course" | "subject" | "module" | "topic"
                //   )
                // }
              >
                <Icon className="rounded-none text-lg text-heading" />
              </motion.div>
              <span className="mt-2 text-xs">
                {step.name
                  .replace("-", " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
              </span>
              {isLastStep && (
                <motion.div className="h-1 bg-purple-500 w-0 absolute right-0 top-1/2 transform -translate-y-1/2" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;

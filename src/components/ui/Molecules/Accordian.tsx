"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { IAccordionProps } from "@/types";
import { nanoid } from "nanoid";

export default function Accordian({ data }: IAccordionProps) {
  return (
    <div className="px-[1.69rem] md:px-0 divide-y divide-[#7E7EAA80] rounded-xl  md:mb-[8rem]">
      {data?.map(({ question, answer }) => (
        <div key={nanoid()}>
          <Disclosure as="div" className=" py-[2rem] md:py-[3.37rem]">
            {({ open }) => (
              <>
                <DisclosureButton className="group flex w-full items-center justify-between">
                  <span className="text-[1.25rem] md:text-[1.5625rem] font-medium text-heading text-start">
                    {question}
                  </span>
                  {open ? (
                    <FaMinus className="w-[1.5rem] md:w-[1.875rem] md:h-[1.875rem] text-[#9090A9]" />
                  ) : (
                    <FaPlus className="w-[1.5rem] md:w-[1.875rem] md:h-[1.875rem] text-[#9090A9]" />
                  )}
                </DisclosureButton>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <DisclosurePanel
                        static
                        className="mt-[2.12rem] text-sm text-sub-heading md:text-[20px] leading-[150%]"
                      >
                        {answer}
                      </DisclosurePanel>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </Disclosure>
        </div>
      ))}
    </div>
  );
}

import { IDashboardFormCardProps } from "@/types";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/custom/tooltip";
import { IoMdHelpCircleOutline } from "react-icons/io";
const FormCardDashboard = ({
  heading,
  children,
  marginAuto = true,
  fullWidthOnMediumDevices,
  headingTextSize,
  helperTooltipDescription,
}: IDashboardFormCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`mb-[3.63rem] bg-input-background ${
        marginAuto && "w-[90%] mx-auto "
      } 
      ${
        fullWidthOnMediumDevices
          ? "md:w-full px-[1.25rem]"
          : "md:w-[55.6875rem]"
      }    rounded-[1.25rem] border-[3px] border-input-background border-opacity-50`}
    >
      <div className="flex justify-between items-center tablet:pt-[1.88rem]">
        <h1
          className={`${headingTextSize} font-caladea  text-center md:text-start leading-[115%] font-bold pt-[1.88rem] tablet:pt-0`}
        >
          {heading}
        </h1>
        {helperTooltipDescription && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <IoMdHelpCircleOutline className="text-2xl text-app-purple" />
              </TooltipTrigger>
              <TooltipContent className="bg-input-background border-input-border">
                <p>{helperTooltipDescription}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      {/* divider */}
      <div className="flex w-full  pt-[1.31rem] pb-[3rem] ">
        <div className="w-full flex-1 px-[1.81rem] md:px-0 md:w-[51.6875rem] border-[1px] border-input-border border-opacity-50 "></div>
      </div>
      <div className="tablet:px-[1.81rem]">{children}</div>
    </motion.div>
  );
};

export default FormCardDashboard;

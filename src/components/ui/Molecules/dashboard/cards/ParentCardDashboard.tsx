import { motion } from "framer-motion";
import Heading from "@/components/ui/Atoms/Heading";
import { IParentCardDashboardProps } from "@/types";
import { Separator } from "@/components/custom/separator";

const ParentCardDashboard = ({
  heading,
  children,
  marginBottom,
  hideSeparator,
}: IParentCardDashboardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`md:w-full lg:w-full rounded-[1.25rem] bg-dashboard-card-background bg-opacity-80 ${marginBottom} backdrop-blur-xl backdrop-brightness-50`}
    >
      <Heading
        heading={heading}
        className="text-heading pt-[3.01rem] text-center md:text-start text-[1.25rem] md:text-[1.875rem] leading-[115%] font-bold md:pt-[3.37rem] md:pl-[3.69rem]"
      />
      {/* divider */}
      {!hideSeparator && (
        <div className="w-[90%] mx-auto">
          <Separator className="bg-input-border my-8" />
        </div>
      )}

      <div className="mx-auto w-[90%]">{children}</div>
    </motion.div>
  );
};

export default ParentCardDashboard;

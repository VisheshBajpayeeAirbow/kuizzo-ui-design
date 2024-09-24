import Image from "next/image";
import GradiantImage from "@/assets/images/institution_hero_gradiant.svg";
import { IDashboardLayoutProps } from "@/types";

const InstitutionDashboardLayout = ({
  children,
  header,
  sidebar,
  dashboard,
}: IDashboardLayoutProps) => {
  return (
    <div className="mx-auto w-[90%] lg:w-[1400px]">
      <Image
        className="absolute right-0 top-0 -z-10"
        src={GradiantImage}
        alt="gradiant-image"
      />
      <div>{header}</div>
      <div className="md:flex md:justify-start mt-[4.75rem]">
        {/* sidebar of dashboard */}
        <div>{sidebar}</div>
        {/* center content of the dashboard */}
        <section className="md:pl-[1.69rem] w-full">{dashboard}</section>
        {/* right side of the dashboard */}
        <section>{children}</section>
        {/* create assessment card */}
      </div>
    </div>
  );
};
export default InstitutionDashboardLayout;

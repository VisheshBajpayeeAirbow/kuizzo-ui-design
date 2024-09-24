"use client";
import { Button } from "@/components";
import HeroEllipse from "@/assets/images/hero-ellipse.png";
import ImageOne from "@/assets/images/home_page_image_one.png";
import ImageTwo from "@/assets/images/home_page_image_two.png";
import ArrowLeftDark from "@/assets/images/home_page_arrow_left.svg";
import ArrowRightDark from "@/assets/images/home_page_arrow_right.svg";
import ArrowLeftLight from "@/assets/images/arrow_left_lightsvg.svg";
import ArrowRightLight from "@/assets/images/arrow_right_light.svg";
import PointingArrow from "@/assets/images/home_page_pointing_arrow.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HeroEllipseMobile from "@/assets/images/hero_section_ellipse_mobile.svg";
import GradientEllipse from "@/assets/images/gradiant_ellipse.svg";
import { useTheme } from "next-themes";
import { useDispatch } from "react-redux";
import { setAuthFormState } from "@/features/appSlice/appSlice";
import { PATHS } from "@/constants";
import { AuthFormState } from "@/types";
import ScrollToTop from "react-scroll-to-top";
import { IoArrowUpCircleOutline } from "react-icons/io5";

const HeroSection = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { resolvedTheme } = useTheme();
  console.log("RESOLVED THEME: ", resolvedTheme);
  const handleNavigateToSignup = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = e.target as HTMLButtonElement;

    if (["institution", "instructor", "student"].includes(id)) {
      dispatch(setAuthFormState(id as AuthFormState));
      router.push(PATHS.signup);
    } else {
      console.error("Invalid id:", id);
    }
  };

  return (
    <section className="md:mt-[55px] lg:mt-20 mb-[154px]">
      {/* gradiant image */}
      <Image
        className="hidden md:block absolute  md:right-16 lg:right-48 md:top-[138px] lg:top-40 z-30"
        width={200}
        height={200}
        style={{ height: "auto", width: "auto" }}
        src={HeroEllipse}
        alt="ellipse"
      />
      <Image
        width={100}
        height={100}
        style={{ height: "auto", width: "auto" }}
        className="absolute top-0  flex-shrink-0 bg-[rgba(128, 87, 216)] opacity-50 hidden md:block"
        src={GradientEllipse}
        alt="gradient-img"
      />
      <Image
        width={100}
        height={100}
        style={{ height: "auto", width: "auto" }}
        src={HeroEllipseMobile}
        alt="ellipse-mobile"
        className="block md:hidden absolute right-4 top-[10.5rem] tablet:right-10 tablet:top-[9rem]  z-40"
      />
      <section className=" flex justify-center">
        {/* rounded div */}
        <div className="z-20 lg:w-[1400px] tablet:w-[86%] tablet:mx-auto mt-[6.19rem] md:mt-[0rem] mx-[1.69rem] mb-[6.88rem] md:mb-0 flex flex-col items-center md:justify-center  bg-transparent border-4 tablet:border-[8px] border-hero-border rounded-[50px] tablet:rounded-[55px] relative pt-[48px] pb-[121px]">
          <div className=" w-[21.5625rem] tablet:w-[50.245rem] md:w-[77rem] mt-[3.5rem] md:mt-[0rem]">
            <h1
              className={`text-heading text-[2.1875rem] md:text-[4.375rem] md:leading-[80px] text-center font-bold mb-[30px] font-caladea`}
            >
              Teaching in the Internet age <br className="hidden md:block" />{" "}
              means we must teach{" "}
              <span className="text-app-orange">
                tomorrow’s{" "}
                <span className="text-app-purple md:hidden">skills today</span>
              </span>{" "}
              <br />
              <div className="md:flex items-center justify-center md:gap-8 hidden">
                <span className="text-app-purple">skills today</span>
                <Image
                  src={PointingArrow}
                  alt="pointing-arrow"
                  className="mt-3 hidden md:block"
                />
              </div>
            </h1>
            <p className="text-sub-heading text-[1.3rem] leading-[150%] md:text-[25px] text-center text-wrap md:w-3/4 lg:w-full md:mx-auto">
              Provides you with the latest online learning system and material that help your
            </p>
          </div>

          <div>
            <Image
              className="md:scale-130 lg:scale-150 hidden tablet:inline-block tablet:left-[10%] absolute md:left-[3.5%] lg:left-[8%] -bottom-24"
              src={ImageOne}
              alt="img"
              priority
            />
            <Image
              className="md:scale-130 lg:scale-150 hidden tablet:inline-block tablet:right-[10%] absolute md:right-[3.8%] lg:right-[8%] -bottom-24"
              src={ImageTwo}
              alt="img"
            />
          </div>

          {/* bottom div */}
          <div
            style={{ zIndex: 100 }}
            className="flex flex-col md:flex-row md:justify-center gap-[25px]  absolute bottom-16 md:bottom-0 left-1/2  -translate-x-1/2 translate-y-1/2 "
          >
            <Image
              className="hidden md:block pt-2"
              src={
                resolvedTheme === "dark" || resolvedTheme === undefined
                  ? ArrowLeftDark
                  : ArrowLeftLight
              }
              alt="arrow-left"
              width={100}
              height={100}
              style={{ height: "auto" }}
            />
            <Button
              id="institution"
              className="cursor-pointer py-[20px] px-[38px]"
              onClick={(e) => handleNavigateToSignup(e)}
              btnColor="green"
            >
              Join as Institution
            </Button>
            <Button
              id="instructor"
              className="cursor-pointer py-[20px] px-[38px]"
              btnColor="orange"
              onClick={(e) => handleNavigateToSignup(e)}
            >
              Join as Instructor
            </Button>
            <Button
              id="student"
              className="cursor-pointer py-[20px] px-[38px]"
              btnColor="purple"
              onClick={(e) => handleNavigateToSignup(e)}
            >
              Join as Student
            </Button>
            <Image
              className="hidden md:inline-block pt-2"
              src={
                resolvedTheme === "dark" || resolvedTheme === undefined
                  ? ArrowRightDark
                  : ArrowRightLight
              }
              alt="arrow-right"
              width={100}
              height={100}
              style={{ height: "auto" }}
            />
          </div>
        </div>
      </section>
      <ScrollToTop
        smooth
        style={{
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
        component={
          <IoArrowUpCircleOutline className="text-2xl text-app-purple hover:scale-[200%] transition ease-in-out duration-300 absolute right-0" />
        }
      />
    </section>
  );
};

export default HeroSection;

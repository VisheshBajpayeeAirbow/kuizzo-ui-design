"use client";
import { Button } from "@/components";
import HeroEllipse from "@/assets/images/hero-ellipse.png";
import ArrowLeft from "@/assets/images/home_page_arrow_left.svg";
import ArrowRight from "@/assets/images/home_page_arrow_right.svg";
import ArrowLeftLight from "@/assets/images/arrow_left_lightsvg.svg";
import ArrowRightLight from "@/assets/images/arrow_right_light.svg";
import Image from "next/image";
import { AuthFormState } from "@/types";
import IconBadge from "../../Atoms/IconBadge";
import { nanoid } from "nanoid";
import Ratings from "@/components/ui/Atoms/Ratings";
import AvatarGroup from "../../Molecules/AvatarGroup";
import LocationIcon from "@/assets/icons/location_icon.svg";
import TelephoneIcon from "@/assets/icons/telephone_icon.svg";
import { avatarsData } from "@/mappings";
import HeroGradiant from "@/assets/images/institution_hero_gradiant.svg";
import SmallEllipse from "@/assets/images/institution_small_ellipse.svg";
import Heading from "../../Atoms/Heading";
import { useTheme } from "next-themes";
import { setAuthFormState } from "@/features/appSlice/appSlice";
import { useDispatch } from "react-redux";
import { PATHS } from "@/constants";
import { useRouter } from "next/navigation";

const InstitutionHeroSection = (props: {
  instituteName: string;
  instituteDescription: string;
  instituteUrl: string;
  logo: string;
  address: string;
  phoneNumber: string[];
}) => {
  const { address, instituteDescription, instituteName, logo, phoneNumber } =
    props;
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const handleNavigateToSignup = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = e.target as HTMLButtonElement;

    if (["institution", "instructor", "student"].includes(id)) {
      dispatch(setAuthFormState(id as AuthFormState));
      router.push(PATHS.signin);
    } else {
      console.error("Invalid id:", id);
    }
  };

  return (
    <section className="md:min-h-[90vh]  md:mt-6  lg:mt-20">
      <Image
        className="hidden tablet:block absolute right-10 tablet:right-0 tablet:top-32 md:top-28  lg:top-40 lg:right-52 z-30"
        width={200}
        style={{ height: "180px", width: "auto" }} // Ensure the height is auto to maintain aspect ratio
        src={HeroEllipse}
        alt="ellipse"
      />
      <Image
        width={100} // Specify the width
        height={100} // Specify the height (can be any value, it will be overridden by Tailwind CSS class)
        style={{ height: "auto", width: "auto" }} // Ensure the height is auto to maintain aspect ratio
        src={HeroGradiant}
        alt="institution-hero-gradiant"
        className="absolute top-0 right-0 -lg:right-20 flex-shrink-0  hidden md:block -z-10"
      />
      <section className="flex justify-center">
        {/* rounded div */}
        <div className="lg:w-[1400px] md:w-[90%] md:mx-auto w-[90%] px-[1.56rem] min-h-[66rem] tablet:min-h-[55rem] mx-[1.69rem] md:min-h-[39.125rem] mt-[5.62rem] md:mt-[0rem]  mb-[6.88rem] md:mb-0 bg-transparent border-4 md:border-8 border-hero-border rounded-[50px] md:rounded-[100px] relative">
          {/* center div */}
          {/* image */}
          <div className="hidden md:block z-10 md:w-[9.625rem] lg:w-[12.625rem] lg:h-[12.625rem] md:h-[9.625rem] rounded-full bg-card-background mt-[3.94rem] ml-[4.44rem] flex-shrink-0 relative">
            <Image
              className="rounded-full"
              alt="institution-img"
              src={logo}
              fill
              sizes="(100vw) md:(100vw)"
            />
          </div>
          {/* small ellipse */}
          <Image
            src={SmallEllipse}
            alt="small-ellipse"
            className="hidden md:block absolute top-[9rem] left-[53.81rem]  right-[20.85rem]"
          />
          {/* title */}
          <Heading
            heading={instituteName}
            className="md:absolute mt-[2.37rem]  text-wrap  leading-[115%] md:mt-0 text-[1.9rem] text-center md:text-[3.125rem] font-bold top-[2.73rem]  md:top-[3.5rem] md:left-[16.94rem] md:text-start lg:left-[20rem] md:w-[56.8125rem] md:h-[5rem] md:flex-shrink-0 "
          />
          {/* avatar group */}
          <div className="md:absolute mt-[1.69rem] md:mt-0  flex justify-center md:top-[8.62rem] lg:top-[9.62rem] md:left-[16.94rem] lg:left-[20rem]">
            <AvatarGroup avatars={avatarsData} />
          </div>

          {/* paragraph */}
          <p className=" md:absolute mt-[2.62rem] md:mt-0 z-20 md:w-[52.875rem] lg:w-[60rem] text-[1.25rem] leading-[150%] text-sub-heading md:left-[16.94rem]  lg:left-[20rem] md:top-[13.44rem] lg:top-[14.44rem]">
            {instituteDescription}
          </p>

          {/* hero badges */}
          <div className="md:absolute mt-[1.63rem] md:mt-0 flex flex-col md:flex-row gap-[0.56rem] md:top-[27.31rem] lg:top-[27.125rem] md:left-[16.31rem] lg:left-[20rem]">
            {/* address */}
            <div className="w-full md:w-[34.4375rem] lg:w-[34.8125rem] h-[6.1875rem] bg-institution-hero-badge rounded-[0.5rem] px-[1rem] flex gap-[1.5rem] items-center justify-start">
              <IconBadge
                size="medium"
                vectorSize="xl"
                iconColor="text-badge-text"
                bgColor="bg-institution-hero-badge-icon"
                Icon={LocationIcon}
              />
              <div className="text-[#d2d2ff] leading-[150%] text-wrap overflow-hidden">
                <p>{address}</p>
              </div>
            </div>

            {/* phone numbers */}
            <div className="md:w-[15.8125rem] lg:w-[21.215rem]  h-[6.25rem]  bg-institution-hero-badge rounded-[0.5rem] flex items-center justify-start gap-[1.5rem] px-[1rem]">
              <IconBadge
                size="medium"
                vectorSize="xl"
                iconColor="text-badge-text"
                bgColor="bg-institution-hero-badge-icon"
                Icon={TelephoneIcon}
              />
              <div className="flex flex-col">
                {phoneNumber?.map((number) => {
                  return (
                    <span
                      className="text-[1.25rem] italic text-[#D2D2FF]"
                      key={nanoid()}
                    >
                      {number}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* bottom div */}
          <div className="flex flex-col md:flex-row md:justify-center gap-4 absolute bottom-16 md:bottom-0 left-1/2  -translate-x-1/2 translate-y-1/2">
            <Image
              className="hidden md:block pt-1"
              src={resolvedTheme === "dark" ? ArrowLeft : ArrowLeftLight}
              alt="arrow-left"
              width={100} // Specify the width
              height={100} // Specify the height (can be any value, it will be overridden by Tailwind CSS class)
              style={{ height: "auto" }} // Ensure the height is auto to maintain aspect ratio
            />
            <Button
              id="institution"
              onClick={(e) => handleNavigateToSignup(e)}
              btnColor="green"
            >
              Login as Institution
            </Button>
            <Button
              id="instructor"
              onClick={(e) => handleNavigateToSignup(e)}
              btnColor="orange"
            >
              Login as Instructor
            </Button>
            <Button
              id="student"
              onClick={(e) => handleNavigateToSignup(e)}
              btnColor="purple"
            >
              Login as Student
            </Button>
            <Image
              className="hidden md:block pt-1"
              src={resolvedTheme === "dark" ? ArrowRight : ArrowRightLight}
              alt="arrow-right"
              width={100} // Specify the width
              height={100} // Specify the height (can be any value, it will be overridden by Tailwind CSS class)
              style={{ height: "auto" }} // Ensure the height is auto to maintain aspect ratio
            />
          </div>
        </div>
      </section>
    </section>
  );
};

export default InstitutionHeroSection;

import { HiDotsVertical } from "react-icons/hi";
import Avatar from "../Atoms/Avatar";
import Ratings from "../Atoms/Ratings";
import Badge from "../Atoms/Badge";
import IconBadge from "../Atoms/IconBadge";
import { nanoid } from "nanoid";
import Button from "../Atoms/Button";
import Image from "next/image";
import CroppedImg from "@/assets/images/authImages/institution_cover_cropped_img.png";
import { SlLocationPin } from "react-icons/sl";
import { RiBuilding2Line, RiTimerLine } from "react-icons/ri";
import { ICardProps } from "@/types";
import Link from "next/link";

const Card = ({
  id,
  cardType,
  avatarImage,
  totalStars,
  totalReviews,
  title,
  badges,
  buttonColor,
  buttonText,
  cardIcon,
  cardIconColor,
  footerText,
  testimonial,
  description,
  redirectLink,
}: ICardProps) => {
  if (cardType === "testimonial") {
    return (
      <div className="rounded-card-border-radius bg-card-background min-w-96">
        <div className="py-12 px-8 ">
          <div className="flex w-full justify-start items-center">
            <div className="flex gap-6 items-center">
              {avatarImage && (
                <Avatar alt="User Avatar" size="large" image={avatarImage} />
              )}
              <h2
                className={`font-extrabold text-[28px] text-wrap text-heading font-caladea`}
              >
                {title}
              </h2>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sub-heading text-wrap text-[20px]">
              {testimonial}
            </p>
          </div>

          <div className="mt-8">
            {totalStars && (
              <div className="mt-4">
                <Ratings rating={totalStars} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // subject is top notes card
  if (cardType === "subject") {
    return (
      <div className="hover:scale-[105%] transition ease-in-out duration-200 rounded-card-border-radius bg-card-background px-8 md:px-[1.12rem] flex flex-col items-start w-full h-[16.5rem] md:w-[18.375rem] md:h-[17.5rem] ">
        <div className=" ">
          <div className="flex flex-col">
            <div className="flex justify-center gap-[0.94rem] items-center mt-[2.5rem]">
              <h2
                className={`font-bold text-[1.125rem] leading-[115%] text-heading font-caladea`}
              >
                {title}
              </h2>
              <div className="cursor-pointer">
                <HiDotsVertical className="text-2xl text-heading w-[1.125rem] h-[1.125rem]" />
              </div>
            </div>
            {totalStars && totalReviews && (
              <div className="mt-[1rem] flex justify-center md:justify-start">
                <Ratings ratingReviewCount={totalReviews} rating={totalStars} />
              </div>
            )}
          </div>
          <div className="mt-[1rem] flex gap-[1.06rem]">
            {badges?.map((badgeText) => {
              return <Badge key={nanoid()} text={badgeText} />;
            })}
          </div>
          <div className="w-full h-[0.04375rem] bg-card-seperator opacity-50 mt-[1rem]" />
          <div className="flex items-center justify-between mt-[1rem]">
            <div className="flex items-center gap-[0.69rem]">
              {cardIconColor && cardIcon && (
                <IconBadge
                  iconColor="text-pure-white"
                  vectorSize="small"
                  size="small"
                  bgColor={cardIconColor}
                  Icon={cardIcon}
                />
              )}
              <h2 className="text-heading text-nowrap font-poppins text-[0.78338rem] font-semibold">
                {footerText}
              </h2>
            </div>
            <Button
              className="w-[5.75rem] h-[2.1875rem]"
              btnColor={buttonColor}
              size="sm"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (cardType === "courses") {
    return (
      <div className="rounded-[20px] bg-card-background w-[90%] mx-auto  tablet:w-[17rem]  h-[29.8125rem]">
        <div className="p-4">
          <div className="w-full">
            <Image
              className="rounded-[0.4375rem] h-[11.0625rem]"
              src={CroppedImg}
              alt="card-img"
            />
          </div>
          <div className=" w-full justify-start items-center">
            <div className="">
              <h2 className="font-extrabold text-[1.125rem] pt-[1.25rem] text-heading font-caladea">
                {title}
              </h2>
            </div>
          </div>
          <div className="flex gap-[1rem] text-xs text-heading pt-[0.8rem]">
            <div className="flex items-center gap-[0.25rem]">
              <SlLocationPin />
              <span className="text-[8px]">Online</span>
            </div>
            <div className="flex items-center gap-[0.25rem]">
              <RiBuilding2Line />
              <span className="text-[8px]">Institute A</span>
            </div>
            <div className="flex items-center gap-[0.25rem]">
              <RiTimerLine />
              <span className="text-[8px]">SAT Biology</span>
            </div>
          </div>
          <div className="mt-[0.75rem]">
            <p className="text-input-text text-wrap  text-[10px]">
              {description}
            </p>
          </div>
          <div className="mt-[0.75rem]">
            {totalStars && (
              <div className="flex gap-[0.38rem]">
                <span className="text-input-text">{totalStars}</span>
                <Ratings rating={totalStars} ratingReviewCount={25} />
              </div>
            )}
          </div>
          <Link
            href={`${redirectLink}/${id}`}
            className=" bg-app-green flex justify-center items-center gap-[0.625rem] rounded-[0.9375rem] mt-[0.75rem] w-[5.75rem] py-[0.3125rem] px-[0.625rem]"
          >
            <span className="text-[0.75rem] leading-[125%]">Enroll Now</span>
          </Link>
        </div>
      </div>
    );
  }

  if (cardType === "testimonial-institution") {
    return (
      <div className="rounded-card-border-radius bg-card-background min-w-96 h-full">
        <div className="py-12 px-8 ">
          <div className="flex w-full justify-center items-center">
            <div className="flex gap-6 items-center">
              {avatarImage && (
                <Avatar alt="User Avatar" size="large" image={avatarImage} />
              )}
              <h2
                className={`font-extrabold text-[28px] text-wrap text-heading font-caladea hidden md:block`}
              >
                {title}
              </h2>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sub-heading text-center md:text-start text-wrap text-[20px]">
              {testimonial}
            </p>
            <h2
              className={`font-extrabold text-[28px] text-wrap text-heading text-center mt-4 font-caladea block md:hidden`}
            >
              {title}
            </h2>
          </div>

          <div className="mt-2 flex justify-center md:justify-start">
            {totalStars && (
              <div className="mt-4">
                <Ratings rating={totalStars} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  // flashcards
  return (
    <div className="hover:scale-[105%] transition ease-in-out duration-200 rounded-card-border-radius bg-top-flashcards-card-background md:w-[18.375rem] md:h-[18.375rem] inline-flex py-[1.75rem] px-8 md:px-[0.6875rem] items-start gap-[0.625rem] border-[1px] border-card-border border-opacity-50">
      <div>
        <div className="flex justify-between items-center px-2">
          <div className="flex items-center gap-[0.44rem]">
            {avatarImage && (
              <Avatar alt="User Avatar" size="medium" image={avatarImage} />
            )}
            {totalStars && totalReviews && (
              <div>
                <Ratings ratingReviewCount={totalReviews} rating={totalStars} />
              </div>
            )}
          </div>

          <div className="cursor-pointer">
            <HiDotsVertical className="w-[1.125rem] h-[1.125rem] text-heading" />
          </div>
        </div>
        <div className="mt-[1rem]">
          <h2
            className={`font-extrabold text-[1.125rem] p-[0.62rem] text-wrap text-heading font-caladea`}
          >
            {title}
          </h2>
        </div>
        <div className="mt-[1rem] flex justify-center gap-[0.62rem] ">
          {badges?.map((badgeText) => {
            return <Badge key={nanoid()} text={badgeText} />;
          })}
        </div>
        <div className="w-full h-[0.04375rem] bg-card-seperator opacity-50 mt-[1rem]" />

        <div className="flex items-center justify-between mt-[1rem] px-2">
          <div className="flex  items-center gap-[0.69rem]">
            {cardIconColor && cardIcon && (
              <IconBadge
                iconColor="text-pure-white"
                vectorSize="small"
                size="small"
                bgColor={cardIconColor}
                Icon={cardIcon}
              />
            )}
            <h2 className="text-heading text-nowrap font-poppins text-[0.78338rem] font-semibold">
              {footerText}
            </h2>
          </div>
          <Button
            className="w-[5.75rem] h-[2.1875rem]"
            btnColor={buttonColor}
            size="sm"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;

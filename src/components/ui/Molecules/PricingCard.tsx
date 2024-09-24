import { IPricingCardProps } from "@/types";
import { nanoid } from "nanoid";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import Button from "../Atoms/Button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { PATHS } from "@/constants";
import { useSession } from "next-auth/react";
import { setPlanDetails } from "@/features/paymentSlice/paymentSlice";
import { renderButtonColorByRole } from "@/utils";
const PricingCard = ({ pricingData, accent }: IPricingCardProps) => {
  const { perks, price, redirectLink, subTitle, title } = pricingData;

  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();

  // ? this value will be fetched from app configuration table from id passed to user object that is logged in
  const currentPlan: "basic" | "plus" | "premium" = "basic";

  const renderCardBackgroundColor = (
    accent: "instructor" | "student" | "institution"
  ) => {
    switch (accent) {
      case "instructor":
        return "bg-app-orange";
      case "student":
        return "bg-app-green";
      default:
        return "bg-app-purple";
    }
  };

  const renderPerks = (perk: boolean | string) => {
    if (typeof perk === "boolean") {
      return perk ? (
        <FaCheck className="text-2xl text-green-500" />
      ) : (
        <RxCross2 className="text-2xl text-red-500" />
      );
    } else {
      return <span className="text-input-text">{perk}</span>;
    }
  };

  const handleNavigateToLogin = () => {
    // ! authFormState not needed to be updated as pricing is accessable only when user is logged in
    // dispatch(setAuthFormState(accent));
    if (session?.user) {
      dispatch(setPlanDetails(pricingData));
      return router.push(PATHS.checkout);
    }
    return router.push(PATHS.signin);
  };

  return (
    <div
      className={`${
        currentPlan === title.split(" ")[0].toLowerCase()
          ? `${renderCardBackgroundColor(accent)} animate-pulse`
          : "bg-card-background"
      } flex flex-col py-6 px-4 w-full text-center  rounded-xl hover:scale-[105%] transition ease-in-out duration-200`}
    >
      <h3 className="mb-4 text-2xl font-semibold font-caladea text-heading">
        {title}
      </h3>
      <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
        {subTitle}
      </p>
      <div className="bg-background rounded-xl mt-4">
        <div className="flex justify-center items-baseline my-8">
          <span className="mr-2 text-5xl font-extrabold font-caladea text-heading">
            {price !== "Free" ? <span>{price}$</span> : <span>{price}</span>}
          </span>
        </div>

        <ul role="list" className="mb-8 space-y-2 text-left p-4">
          {perks.map(({ perkOption, perkDescription }) => {
            return (
              <li
                key={nanoid()}
                className="flex justify-between items-center hover:font-bold hover:translate-x-1 transition ease-in-out duration-150 "
              >
                <span className="text-sub-heading">{perkDescription}</span>
                {renderPerks(perkOption)}
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        className="mt-4 cursor-pointer"
        onClick={handleNavigateToLogin}
        variant="default"
        btnColor={renderButtonColorByRole(accent)}
        disabled={currentPlan === title.split(" ")[0].toLowerCase()}
      >
        {currentPlan === title.split(" ")[0].toLowerCase() ? (
          <span className="font-bold">Active Plan</span>
        ) : (
          "Purchase Now"
        )}
      </Button>
    </div>
  );
};

export default PricingCard;

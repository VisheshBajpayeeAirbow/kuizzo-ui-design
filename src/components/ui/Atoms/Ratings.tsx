import { IStarRatingProps } from "@/types";
import React from "react";
import { FaStar } from "react-icons/fa";

const StarRating: React.FC<IStarRatingProps> = ({
  rating,
  ratingReviewCount,
  countSize,
}) => {
  const totalStars = 5;

  return (
    <div className="flex gap-[0.44rem]">
      <div className="flex gap-[0.19rem] items-center">
        {Array.from({ length: totalStars }, (_, index) =>
          index < rating ? (
            <FaStar
              width={"0.62744rem"}
              height={"0.62744rem"}
              key={index}
              className="text-rating-star-color "
            />
          ) : (
            <FaStar
              width={"0.62744rem"}
              height={"0.62744rem"}
              key={index}
              className="text-[#CBC2FF] "
            />
          )
        )}
      </div>
      {ratingReviewCount && (
        <span
          className={`text-rating-count text-xs pt-1  font-bold ${countSize}`}
        >
          ({ratingReviewCount})
        </span>
      )}
    </div>
  );
};

export default StarRating;

import React from "react";
import Avatar from "@/components/ui/Atoms/Avatar";
import { IAvatarGroupProps } from "@/types";

const sizeClasses = {
  small: "w-8 h-8",
  medium: "w-12 h-12",
  large: "w-[3.4375rem] h-[3.4375rem]",
};

const AvatarGroup = ({
  avatars,
  maxDisplay = 4,
  size = "large",
}: IAvatarGroupProps) => {
  const displayedAvatars = avatars.slice(0, maxDisplay);
  const remainingAvatarsCount = avatars.length - maxDisplay;

  return (
    <div className="flex items-center -space-x-4">
      {displayedAvatars.map((avatar, index) => (
        <Avatar key={index} image={avatar.image} alt={avatar.alt} size={size} />
      ))}
    </div>
  );
};

export default AvatarGroup;

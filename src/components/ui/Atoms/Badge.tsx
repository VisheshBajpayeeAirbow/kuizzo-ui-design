import React from "react";

interface BadgeProps {
  text: string;
}

const Badge = (props: BadgeProps) => {
  // Calculate the width dynamically based on the length of the text
  const widthStyle = {
    minWidth: `${props.text.length * 8}px`, // You can adjust the multiplier as needed
  };

  return (
    <div
      className="rounded-badge-radius bg-badge-background   text-[13px] text-badge-text p-2"
      style={widthStyle} // Apply dynamic width style
    >
      {props.text}
    </div>
  );
};

export default Badge;

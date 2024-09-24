import React from "react";

const CheckboxInput = ({ label }: { label: string }) => {
  return (
    <div className="flex">
      <input
        type="checkbox"
        className="border-app-purple w-[1.9375rem] h-[1.9375rem] bg-transparent rounded-[0.3125rem] border-[3px] ring-0 focus:ring-0 focus:bg-app-purple checked:hover:bg-app-purple hover:bg-app-purple checked:active:bg-app-purple checked:bg-app-purple outline-none"
      />
      <span className="text-[0.94006rem] italic tracking-[0.047rem] font-inter text-sub-heading pl-[1.25rem]">
        {label}
      </span>
    </div>
  );
};

export default CheckboxInput;

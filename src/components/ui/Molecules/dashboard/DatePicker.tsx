import { DateRange, IDatePickerProps } from "@/types";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

const DatePicker = ({ label, dateSetter, dateValue }: IDatePickerProps) => {
  const handleValueChange = (newValue: DateValueType) => {
    console.log("newValue:", newValue);
    dateSetter(newValue as DateRange);
  };

  return (
    <div className="flex flex-col gap-[1.63rem] mt-[2.66rem]">
      <label className="text-input-label text-[0.875rem] font-semibold leading-[115%] tracking-[0.04375rem]">
        {label}
      </label>
      <Datepicker
        asSingle
        useRange={false}
        value={dateValue}
        onChange={handleValueChange}
        popoverDirection="down"
        primaryColor="purple"
        toggleClassName="absolute bg-app-purple rounded-r-lg text-white right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
        inputClassName="focus:border-transparent focus:ring-0 bg-dashboard-input-background w-full h-[3.0625rem] text-input-text rounded-[10px] placeholder:italic placeholder:text-input-text"
      />
    </div>
  );
};

export default DatePicker;

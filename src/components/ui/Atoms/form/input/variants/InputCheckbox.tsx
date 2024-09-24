import { IFormInputProps } from "@/types";

const InputCheckbox = ({ labelText, name, register }: IFormInputProps) => {
  return (
    <div className="w-full flex items-center">
      <input
        name={name}
        {...register(name)}
        type="checkbox"
        className="border-app-purple w-[1.9375rem] h-[1.9375rem] bg-transparent rounded-[0.3125rem] border-[3px] ring-0 focus:ring-0 focus:bg-app-purple checked:hover:bg-app-purple hover:bg-app-purple checked:active:bg-app-purple checked:bg-app-purple outline-none"
      />
      <label className="text-[0.94006rem] italic tracking-[0.047rem] font-inter text-sub-heading pl-[1.25rem]">
        {labelText}
      </label>
    </div>
  );
};

export default InputCheckbox;

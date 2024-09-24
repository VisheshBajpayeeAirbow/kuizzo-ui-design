import { IFormInputProps } from "@/types";

const InputRadio = ({ name, register, labelText }: IFormInputProps) => {
  return (
    <div className="flex gap-[1.25rem]">
      <input
        className="w-6 h-6 bg-transparent text-app-purple border-app-purple focus:ring-purple-500"
        type="radio"
        name={name}
        value={labelText}
        {...register(name)}
      />
      <label className="text-[0.94006rem] tracking-[0.047rem] text-input-label italic">
        {labelText}
      </label>
    </div>
  );
};

export default InputRadio;

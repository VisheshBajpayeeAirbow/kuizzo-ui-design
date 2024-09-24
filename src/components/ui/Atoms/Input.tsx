import { FaSearch } from "react-icons/fa";

interface InputProps {}

const Input = (props: InputProps) => {
  return (
    <div className="relative flex items-center w-full">
      <FaSearch className="absolute left-4 text-input-icon" />
      <input
        placeholder="search for anything"
        className="bg-input-background p-3 pl-10 pr-3 outline-none rounded-[60px] placeholder:text-input-text w-full border-none"
      />
    </div>
  );
};

export default Input;

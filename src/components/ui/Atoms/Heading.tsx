import { IHeadingProps } from "@/types";

const Heading = (props: IHeadingProps) => {
  return <h1 className={`font-caladea ${props.className}`}>{props.heading}</h1>;
};

export default Heading;

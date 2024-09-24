import Image from "next/image";
import LearnMoreImage from "@/assets/images/home_page_learn_more_image.png";
import { Button } from "@/components";

const LearnMoreSection = () => {
  return (
    <section className="bg-background pt-[5rem] pb-[6.5rem] md:rounded-tr-[100px]">
      <div className="w-[86%] mx-auto">
        <div className="md:flex md:items-center">
          <div className="flex justify-center items-center md:w-full md:pl-[36px]">
            <Image
              className="block md:hidden"
              width={292.02}
              height={278.85}
              src={LearnMoreImage}
              alt="learn-more"
            />
            <Image
              className="hidden md:block"
              src={LearnMoreImage}
              alt="learn-more"
            />
          </div>
          <div className="flex flex-col md:pl-[89px]">
            {/* mobile heading */}
            <div
              className={`text-[2.1875rem] mt-[5.01rem] md:mt-8 md:hidden font-semibold leading-[115%] font-caladea`}
            >
              <h1 className={`text-app-purple`}>The number one</h1>
              <h1 className="text-app-purple ">
                factor in <span className=" text-heading">relevance</span>
              </h1>
              <h1 className=" text-heading text-nowrap">drives out resistance</h1>
            </div>
            {/* desktop heading */}

            <div
              className={`text-[35px] md:text-[50px] mt-[8.06rem] md:mt-0 hidden md:block font-caladea font-semibold`}
            >
              <h1 className="text-app-purple leading-[115%]">
                The number one factor
              </h1>
              <h1 className="text-heading text-nowrap leading-[115%]">
                relevance drives out
              </h1>
            </div>

            <div>
              <p className="text-sub-heading mt-[2.94rem] md:mt-[2.37rem] md:text-[20px]">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
              </p>
            </div>

            <div className="mt-[3rem] w-full">
              <div className="w-1/2">
                <Button className="w-[9.4375rem]" btnColor={"purple"}>
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnMoreSection;

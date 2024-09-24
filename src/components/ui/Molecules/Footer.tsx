import { footerData } from "@/mappings";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-footer-background text-white px-4 pb-[35px] pt-[107px]">
      <div className="flex flex-wrap justify-between md:w-[87%] md:mx-auto lg:w-[1400px]">
        <div className="max-w-max w-full">
          <div className="flex justify-center md:justify-start pl-[5px]">
            <Image src={footerData.logo} alt="logo" />
          </div>
          <p className="text-center md:text-left text-lg leading-[28px] text-[#D2D2FF] max-w-[366px] mt-[23px]">{footerData.description}</p>
        </div>
        {footerData.sections.map((section, index) => (
          <div
            key={index}
            className={`max-w-max w-full ${
              index > 0 ? "md:ml-0" : ""
            }`}
          >
            <h1 className="text-2xl mb-[55px] font-bold font-caladea">{section.title}</h1>
            <div className="flex flex-col">
              {section.items.map((item, itemIndex) => (
                <span
                  key={itemIndex}
                  className="text-nowrap text-lg cursor-pointer hover:underline hover:text-bold text-[#D2D2FF] mb-[23px] last:mb-0"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-[5rem] md:w-[87%] md:mx-auto lg:w-[1400px]">
        <hr className="border-t-2 border-white opacity-50" />
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:items-center mt-8">
          <span>{footerData.copyright}</span>
          <div className="flex gap-4">
            {footerData.socialMedia.map((social, index) => (
              <social.icon
                key={index}
                className="cursor-pointer text-xl hover:scale-150 transition ease-in-out duration-300"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

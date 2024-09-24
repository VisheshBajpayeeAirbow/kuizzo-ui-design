import { footerData } from "@/mappings";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-footer-background text-white py-16 px-4 md:py-28 ">
      <div className="grid grid-cols-5 gap-12 md:w-[90%] md:mx-auto lg:w-[1400px]">
        <div className="col-span-5 md:col-span-2">
          <div className="flex justify-center md:justify-start">
            <Image src={footerData.logo} alt="logo" />
          </div>
          <p className="text-center md:text-left">{footerData.description}</p>
        </div>
        {footerData.sections.map((section, index) => (
          <div
            key={index}
            className={`col-span-2 md:col-span-1 ${
              index > 0 ? "md:ml-12" : ""
            }`}
          >
            <h1 className="text-2xl mb-8 mt-4">{section.title}</h1>
            <div className="flex flex-col gap-4">
              {section.items.map((item, itemIndex) => (
                <span
                  key={itemIndex}
                  className="text-nowrap cursor-pointer hover:underline hover:text-bold"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 md:w-[90%] md:mx-auto lg:w-[1400px]">
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

import { Button } from "@/components";
import Heading from "@/components/ui/Atoms/Heading";
import SidebarNavigationButton from "@/components/ui/Atoms/SidebarNavigationButton";
import { institutionSidebarLinks } from "@/mappings";
import { nanoid } from "nanoid";
import adImageThree from "@/assets/images/adsDummyImages/Rectangle 2907.png";
import Image from "next/image";

const Sidebar = () => {
  return (
    // desktop view
    <aside className="flex flex-col">
      <section className="hidden md:inline-flex h-full flex-col items-start flex-shrink-0 bg-top-flashcards-card-background rounded-[1.25rem] border-[1px] border-opacity-50 border-dashboard-sidebar-border">
        {/* profile section */}
        <div className="flex flex-col items-center gap-[0.625rem] flex-shrink-0 h-[14.0625rem] px-[1.5625rem] py-[1.4375rem] rounded-t-[1.25rem]">
          <div className="bg-badge-background rounded-full w-[3.125rem] h-[3.125rem]"></div>
          <Heading
            heading="Brillient Professional Acadamy"
            className="w-[9.6875rem] h-[4rem] text-[1.125rem] leading-[115%] font-bold text-center text-heading"
          />
          <span className="text-[0.625rem] leading-[150%] text-sub-heading font-normal">
            @bpacademy
          </span>

          <div className="flex gap-[0.56rem]">
            {/* follow/following buttons */}
            <div className="h-[1.5625rem] text-nowrap p-[0.625rem] rounded-[0.9375rem] bg-badge-background flex items-center justify-center gap-[0.625rem] text-[0.625rem]">
              0 Followers
            </div>
            <div className="h-[1.5625rem] text-nowrap p-[0.625rem] rounded-[0.9375rem] bg-badge-background flex items-center justify-center gap-[0.625rem] text-[0.625rem]">
              5 Followers
            </div>
          </div>
        </div>
        {/* navigation section */}
        <div className="border-dashboard-sidebar-border border-t-[2px] w-full">
          {/* library trash buttons */}
          <div className="flex justify-center gap-[0.43rem] mt-[1.75rem]">
            <Button
              btnColor={"purple"}
              className="w-[4.56638rem] h-[1.6875rem] text-[0.75rem] px-[0.75rem] py-[0.5rem]"
            >
              <span className="leading-[125%]  font-semibold">Library</span>
            </Button>
            {/* need to change to button if required */}
            <div className="inline-flex h-[1.6875rem] px-[1rem] py-[0.5rem] flex-shrink justify-center items-center rounded-[1.875rem] border-[1px] border-dashboard-sidebar-border">
              <span className="leading-[125%] font-normal text-center text-[0.75rem]">
                Trash
              </span>
            </div>
          </div>

          {/* sidebar navigation buttons */}
          <div className="mt-[2.22rem]">
            {institutionSidebarLinks.map(
              ({ image, link, text, noBorder, darkImage }) => {
                return (
                  <SidebarNavigationButton
                    key={nanoid()}
                    darkImage={darkImage}
                    image={image}
                    link={link}
                    text={text}
                    noBorder={noBorder}
                  />
                );
              }
            )}
          </div>
        </div>
      </section>

      <Image
        className="mt-[1.69rem] hidden md:inline-flex"
        src={adImageThree}
        alt="Add image 3"
      />
    </aside>
  );
};

export default Sidebar;

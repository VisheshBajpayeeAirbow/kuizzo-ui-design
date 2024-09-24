import CardBrowseSection from "@/components/ui/Molecules/CardBrowseSection";
import { FaArrowRight } from "react-icons/fa6";
import Heading from "@/components/ui/Atoms/Heading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/custom/carousel";
import { browseByExamsList } from "@/mappings";

// browse by exams section component
const BrowseByExamSection = () => {
  return (
    <div className=" md:rounded-tr-[100px] md:rounded-bl-[100px] bg-background">
      <section className=" lg:w-[1400px] md:w-[86%] md:mx-auto">
        <div className="flex flex-col items-center mt-[78px]">
          <Heading
            heading="Browse By Exams"
            className="text-[2.1875rem] md:text-[3.125rem] leading-[57px] font-semibold text-heading mb-[12px]"
          />
          <p className="text-sub-heading text-[1rem] md:text-[25px]">
            Resources across various exams.
          </p>
        </div>

        {/* card section */}
        <div className=" px-[1.69rem] md:px-0 pt-[3.37rem] pb-[4rem] md:pt-[65px] md:pb-[107px]">
          <Carousel>
            <CarouselContent>
              {browseByExamsList.map(
                ({
                  buttonColor,
                  buttonText,
                  cardIcon,
                  cardIconBgColor,
                  cardIconColor,
                  id,
                  title,
                }) => {
                  return (
                    <CarouselItem
                      key={id}
                      className=" basis-full tablet:basis-1/3"
                    >
                      <CardBrowseSection
                        buttonIcon={FaArrowRight}
                        buttonText={buttonText}
                        cardIcon={cardIcon}
                        cardIconBgColor={cardIconBgColor}
                        cardIconColor={cardIconColor}
                        buttonColor={buttonColor}
                        title={title}
                      />
                    </CarouselItem>
                  );
                }
              )}
            </CarouselContent>
            <CarouselPrevious className="hidden tablet:inline-flex hover:scale-105" />
            <CarouselNext className="hidden tablet:inline-flex  hover:scale-105" />
          </Carousel>
        </div>
      </section>
    </div>
  );
};

export default BrowseByExamSection;

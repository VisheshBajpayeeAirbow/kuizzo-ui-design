import Image from "next/image";
import Heading from "../../Atoms/Heading";
import { IInstitutionGalleryProps } from "@/types";
import { nanoid } from "nanoid";

const InstitutionSuccessStory = (props: IInstitutionGalleryProps) => {
  const { images } = props;

  return (
    <div className="lg:w-[1400px] md:w-[90%] md:mx-auto">
      <div className="flex flex-col items-center gap-4 mb-4 md:mb-8 md:mt-[6.81rem] mt-[4.87rem]">
        <Heading
          heading="Success Story"
          className="text-[35px] md:text-[50px] font-semibold text-heading"
        />
      </div>

      <div className="flex overflow-x-auto md:gap-[1.94rem] md:grid md:overflow-x-visible md:grid-cols-3 md:mt-[6.5rem] mt-[3.19rem]">
        {images?.map((imageUrl) => {
          return (
            <Image
              key={nanoid()}
              width={100}
              height={100}
              src={imageUrl}
              alt="success-img-1"
              className="rounded-[20px] h-48 w-48 md:w-full md:h-96 object-cover ml-4 md:ml-0"
            />
          );
        })}
      </div>
    </div>
  );
};

export default InstitutionSuccessStory;

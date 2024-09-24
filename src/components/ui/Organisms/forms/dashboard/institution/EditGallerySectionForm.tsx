import Button from "@/components/ui/Atoms/Button";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import { IGallerySectionForm } from "@/types";
import React from "react";
import { useForm } from "react-hook-form";

export interface IGallerySectionFormDefaultValues {
  data: string[];
  hidden: boolean;
}

export interface IGallerySectionFormProps {
  submitHandler: (data: IGallerySectionFormDefaultValues) => void;
  defaultValues: IGallerySectionFormDefaultValues | undefined;
}

const EditGallerySectionForm = ({
  submitHandler,
  defaultValues,
}: IGallerySectionFormProps) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<IGallerySectionForm>({
    defaultValues: {
      galleryImageOne: defaultValues?.data ? defaultValues?.data[0] : "",
      galleryImageTwo: defaultValues?.data ? defaultValues?.data[1] : "",
      galleryImageThree: defaultValues?.data ? defaultValues?.data[2] : "",
      galleryImageFour: defaultValues?.data ? defaultValues?.data[3] : "",
      galleryImageFive: defaultValues?.data ? defaultValues?.data[4] : "",
      galleryImageSix: defaultValues?.data ? defaultValues?.data[5] : "",
      hidden: defaultValues?.data
        ? defaultValues?.hidden
          ? "yes"
          : "no"
        : "no",
    },
  });

  const onSubmit = (data: IGallerySectionForm) => {
    console.log(data);

    const payload = {
      data: [
        data.galleryImageOne,
        data.galleryImageTwo,
        data.galleryImageThree,
        data.galleryImageFour,
        data.galleryImageFive,
        data.galleryImageSix,
      ],
      hidden: data.hidden === "yes",
    };
    submitHandler(payload);
  };

  const watchAllFields = watch();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <pre>{JSON.stringify(watchAllFields, null, 2)}</pre> */}
      <div className="grid md:grid-cols-3 gap-[1.87rem]">
        <FormInput
          register={register}
          labelText="Upload Logo"
          name="galleryImageOne"
          placeholder="Upload Logo"
          inputType="file"
          fileUploadType={["image/png", "image/jpeg", "image/jpg"]}
          requiredField
          imageUrl={defaultValues?.data ? defaultValues?.data[0] : ""}
        />
        <FormInput
          register={register}
          labelText="Upload Logo"
          name="galleryImageTwo"
          placeholder="Upload Logo"
          inputType="file"
          fileUploadType={["image/png", "image/jpeg", "image/jpg"]}
          requiredField
          imageUrl={defaultValues?.data ? defaultValues?.data[1] : ""}
        />
        <FormInput
          register={register}
          labelText="Upload Logo"
          name="galleryImageThree"
          placeholder="Upload Logo"
          inputType="file"
          fileUploadType={["image/png", "image/jpeg", "image/jpg"]}
          requiredField
          imageUrl={defaultValues?.data ? defaultValues?.data[2] : ""}
        />
        <FormInput
          register={register}
          labelText="Upload Logo"
          name="galleryImageFour"
          placeholder="Upload Logo"
          inputType="file"
          fileUploadType={["image/png", "image/jpeg", "image/jpg"]}
          requiredField
          imageUrl={defaultValues?.data ? defaultValues?.data[3] : ""}
        />
        <FormInput
          register={register}
          labelText="Upload Logo"
          name="galleryImageFive"
          placeholder="Upload Logo"
          inputType="file"
          fileUploadType={["image/png", "image/jpeg", "image/jpg"]}
          requiredField
          imageUrl={defaultValues?.data ? defaultValues?.data[4] : ""}
        />
        <FormInput
          register={register}
          labelText="Upload Logo"
          name="galleryImageSix"
          placeholder="Upload Logo"
          inputType="file"
          fileUploadType={["image/png", "image/jpeg", "image/jpg"]}
          requiredField
          imageUrl={defaultValues?.data ? defaultValues?.data[5] : ""}
        />
      </div>
      <div className="mt-[2.69rem]">
        <FormInput
          name="hidden"
          placeholder="Hidden?"
          register={register}
          errorMessage={errors?.hidden?.message}
          labelText="Do you want to hide this section?"
          selectOptions={["yes", "no"]}
          inputType="select"
        />
      </div>
      <div className="flex flex-col items-center md:items-start md:flex-row md:justify-center gap-[3.25rem] mb-[4rem]">
        <Button
          type="submit"
          className="w-[12.125rem] h-[3.9375rem] mt-[3.33rem]"
          btnColor="purple"
        >
          Update Section
        </Button>
      </div>
    </form>
  );
};

export default EditGallerySectionForm;

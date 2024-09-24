"use client";
import Button from "@/components/ui/Atoms/Button";
import InputBasic from "@/components/ui/Atoms/form/input/variants/InputBasic";
import { IFileUpload, IHeroSectionForm } from "@/types";
import { EditHeroSectionFormSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import { fileToBase64 } from "@/utils";

export interface IEditHeroSectionDefaultValues {
  instituteName: string;
  instituteDescription: string;
  address: string;
  phoneNumber: string[];
  logo: IFileUpload;
  instituteUrl: string;
}

export interface IEditHeroSectionFormProps {
  defaultValues?: IEditHeroSectionDefaultValues | undefined;
  submitHandler: (data: IEditHeroSectionDefaultValues) => void;
}

const EditHeroSectionForm = ({
  submitHandler,
  defaultValues,
}: IEditHeroSectionFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IHeroSectionForm>({
    resolver: yupResolver(EditHeroSectionFormSchema),
    defaultValues: {
      title: defaultValues?.instituteName,
      description: defaultValues?.instituteDescription,
      address: defaultValues?.address,
      heroImage: defaultValues?.logo?.fileKey,
      instituteUrl: defaultValues?.instituteUrl,
    },
  });

  const [phoneInputs, setPhoneInputs] = useState(
    defaultValues?.phoneNumber
      ? defaultValues.phoneNumber.map((phone, idx) => ({
          id: idx,
          value: phone,
        }))
      : [{ id: 1, value: "" }]
  );

  const addPhoneInput = () => {
    if (phoneInputs.length < 2) {
      setPhoneInputs([
        ...phoneInputs,
        { id: phoneInputs.length + 1, value: "" },
      ]);
    }
  };

  const removePhoneInput = () => {
    if (phoneInputs.length > 1) {
      setPhoneInputs(phoneInputs.slice(0, -1));
    }
  };

  const handlePhoneChange = (index: number, value: string) => {
    const newPhoneInputs = phoneInputs.map((phoneInput, idx) => {
      if (index === idx) {
        return { ...phoneInput, value };
      }
      return phoneInput;
    });
    setPhoneInputs(newPhoneInputs);
  };
  const onSubmit = async (data: IHeroSectionForm) => {
    const phoneNumbers = phoneInputs.map((input) => input.value);

    let heroImageBuffer: string | undefined; // Updated type to include undefined

    // Check if data.heroImage is an instance of FileList and get the first file if it exists
    const heroImageFile =
      data.heroImage instanceof FileList && data.heroImage.length > 0
        ? data.heroImage[0]
        : undefined;

    if (heroImageFile) {
      heroImageBuffer = await fileToBase64(heroImageFile);
    }

    // Prepare the payload
    const payload = {
      instituteName: data.title,
      instituteDescription: data.description,
      logo: {
        fileType: heroImageFile?.type,
        fileName: heroImageFile?.name,
        fileKey: heroImageBuffer ?? "", // Use an empty string if heroImageBuffer is undefined
      },
      instituteUrl: data.instituteUrl,
      address: data.address,
      phoneNumber: phoneNumbers,
    };

    console.log("HERO SECTION FORM PAYLOAD: ", payload);
    submitHandler(payload);
  };

  const watchAllFields = watch();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <pre>{JSON.stringify(watchAllFields, null, 2)}</pre> */}
      {/* image input */}
      <div className="w-full ">
        <FormInput
          register={register}
          labelText="Upload Logo"
          name="heroImage"
          placeholder="Upload Logo"
          inputType="file"
          fileUploadType={["image/jpeg", "image/jpg", "image/png"]}
          // add placeholder image in else block of ternary operator
          imageUrl={
            typeof defaultValues?.logo === "string" ? defaultValues?.logo : ""
          }
        />
      </div>

      <div className="space-y-[2.69rem]  mt-[2.69rem]">
        <FormInput
          register={register}
          errorMessage={errors.title?.message}
          labelText="Enter Institute Name"
          name="title"
          placeholder="Title"
          inputType="default"
        />

        <FormInput
          register={register}
          errorMessage={errors.description?.message}
          labelText="Institute Description"
          name="description"
          placeholder="Enter Course Description"
          inputType="textarea"
        />
        <FormInput
          register={register}
          errorMessage={errors.instituteUrl?.message}
          labelText="Institute Url"
          name="instituteUrl"
          placeholder="Enter Institute Url Name"
          inputType="default"
        />

        <FormInput
          register={register}
          errorMessage={errors.address?.message}
          labelText="Address"
          name="address"
          placeholder="Address"
          inputType="default"
        />
      </div>
      <div className="mt-[2.91rem]">
        <label
          className="text-input-label text-[0.875rem] font-semibold leading-[115%] tracking-[0.04375rem]"
          htmlFor="input-basic"
        >
          Phone Number
        </label>
        {phoneInputs.map((input, index) => {
          return (
            <InputBasic
              key={input.id}
              addPhoneInput={addPhoneInput}
              removePhoneInput={removePhoneInput}
              hideAddButton={index === 1 ? true : false}
              placeholder="Phone"
              inputType="string"
              value={input.value}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handlePhoneChange(index, e.target.value)
              }
            />
          );
        })}
      </div>
      <div className="flex justify-center mb-[4rem]">
        <Button
          type="submit"
          className="w-[12.125rem] mt-[4.97rem]"
          btnColor="purple"
        >
          Add Hero
        </Button>
      </div>
    </form>
  );
};

export default EditHeroSectionForm;

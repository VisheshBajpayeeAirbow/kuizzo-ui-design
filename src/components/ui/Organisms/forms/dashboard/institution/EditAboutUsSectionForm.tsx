import Button from "@/components/ui/Atoms/Button";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import { IAboutUsSectionForm, IFileUpload } from "@/types";
import { fileToBase64 } from "@/utils";
import { EditAboutUsFormSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export interface IEditAboutUsSectionDefaultValues {
  data: {
    title: string;
    description: string;
    images: IFileUpload[];
  };
  hidden: boolean;
}

export interface IEditAboutUsSectionFormProps {
  submitHandler: (data: IEditAboutUsSectionDefaultValues) => void;
  defaultValues: IEditAboutUsSectionDefaultValues | undefined;
}

const EditAboutUsSectionForm = ({
  submitHandler,
  defaultValues,
}: IEditAboutUsSectionFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IAboutUsSectionForm>({
    resolver: yupResolver(EditAboutUsFormSchema),
    defaultValues: {
      title: defaultValues?.data ? defaultValues?.data.title : "",
      description: defaultValues?.data ? defaultValues?.data.description : "",
      aboutUsImageOne: defaultValues?.data && {
        fileType: defaultValues?.data.images[0].fileType,
        fileName: defaultValues?.data.images[0].fileName,
        fileKey: defaultValues?.data.images[0].fileKey,
      },
      aboutUsImageTwo: defaultValues?.data && {
        fileType: defaultValues?.data.images[1].fileType,
        fileName: defaultValues?.data.images[1].fileName,
        fileKey: defaultValues?.data.images[1].fileKey,
      },
      hidden: defaultValues?.hidden
        ? defaultValues?.hidden
          ? "yes"
          : "no"
        : "no",
    },
  });

  const onSubmit = async (data: IAboutUsSectionForm) => {
    console.log("ABOUT US SECTION FORM DATA: ", data);

    // Initialize variables with default values
    let imageOneBuffer: string = "";
    let imageTwoBuffer: string = "";

    // Check if files are provided and convert to base64
    const aboutImageOneFile =
      data.aboutUsImageOne instanceof FileList &&
      data.aboutUsImageOne.length > 0
        ? data.aboutUsImageOne[0]
        : undefined;

    const aboutImageTwoFile =
      data.aboutUsImageTwo instanceof FileList &&
      data.aboutUsImageTwo.length > 0
        ? data.aboutUsImageTwo[0]
        : undefined;

    if (aboutImageOneFile) {
      imageOneBuffer = await fileToBase64(aboutImageOneFile);
    }
    if (aboutImageTwoFile) {
      imageTwoBuffer = await fileToBase64(aboutImageTwoFile);
    }

    // Prepare the payload
    const payload: IEditAboutUsSectionDefaultValues = {
      data: {
        title: data.title,
        description: data.description,
        images: [
          {
            fileKey: imageOneBuffer,
            fileName: aboutImageOneFile?.name ?? "",
            fileType: aboutImageOneFile?.type ?? "",
          },
          {
            fileKey: imageTwoBuffer,
            fileName: aboutImageTwoFile?.name ?? "",
            fileType: aboutImageTwoFile?.type ?? "",
          },
        ],
      },
      hidden: data.hidden === "yes" ? true : false,
    };

    submitHandler(payload);
  };

  const watchAllFields = watch();

  console.log("DEFAULT VALUES: ", defaultValues);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <pre>{JSON.stringify(watchAllFields, null, 2)}</pre> */}
      <div className="flex flex-col md:flex-row gap-[1.75rem] ">
        <FormInput
          register={register}
          labelText="Upload Logo"
          name="aboutUsImageOne"
          placeholder="Upload Logo"
          inputType="file"
          fileUploadType={["image/png", "image/jpeg", "image/jpg"]}
          imageUrl={
            defaultValues?.data ? defaultValues?.data.images[0].fileKey : ""
          }
        />
        <FormInput
          register={register}
          labelText="Upload Logo"
          name="aboutUsImageTwo"
          placeholder="Upload Logo"
          inputType="file"
          fileUploadType={["image/png", "image/jpeg", "image/jpg"]}
          imageUrl={
            defaultValues?.data ? defaultValues?.data.images[1].fileKey : ""
          }
        />
      </div>
      <div className="mt-[2.69rem]">
        <FormInput
          register={register}
          errorMessage={errors.title?.message}
          labelText="Enter Title"
          name="title"
          placeholder="Title"
          inputType="default"
          fileUploadType={["image/png", "image/jpeg", "image/jpg"]}
        />
      </div>
      <div className="mt-[2.66rem]">
        <FormInput
          register={register}
          errorMessage={errors.description?.message}
          labelText="Description"
          name="description"
          placeholder="Enter Course Description"
          inputType="textarea"
        />
      </div>
      {/* hidden required */}
      <div className="mt-[2.66rem]">
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
          Add About
        </Button>
      </div>
    </form>
  );
};

export default EditAboutUsSectionForm;

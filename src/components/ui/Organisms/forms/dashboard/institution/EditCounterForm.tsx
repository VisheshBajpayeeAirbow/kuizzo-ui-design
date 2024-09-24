import Button from "@/components/ui/Atoms/Button";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import { IInstitutionEditCounterForm } from "@/types";
import { EditCounterSectionFormSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { GrPowerReset } from "react-icons/gr";

export interface IEditCounterSectionDefaultValues {
  data: { heading: string; number: number }[];
  hidden: boolean;
}

export interface IEditCounterSectionFormProps {
  defaultValues: IEditCounterSectionDefaultValues | undefined;
  submitHandler: (data: IEditCounterSectionDefaultValues) => void;
}
const EditCounterForm = ({
  submitHandler,
  defaultValues,
}: IEditCounterSectionFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IInstitutionEditCounterForm>({
    resolver: yupResolver(EditCounterSectionFormSchema),
    defaultValues: {
      titleOne: defaultValues?.data ? defaultValues?.data[0].heading : "",
      titleTwo: defaultValues?.data ? defaultValues?.data[1].heading : "",
      titleThree: defaultValues?.data ? defaultValues?.data[2].heading : "",
      countOne: defaultValues?.data ? defaultValues?.data[0].number : 0,
      countTwo: defaultValues?.data ? defaultValues?.data[1].number : 0,
      countThree: defaultValues?.data ? defaultValues?.data[2].number : 0,
      hidden: defaultValues?.hidden
        ? defaultValues?.hidden
          ? "yes"
          : "no"
        : "no",
    },
  });

  const onSubmit = (data: IInstitutionEditCounterForm) => {
    const payload = {
      data: [
        { heading: data.titleOne, number: data.countOne },
        { heading: data.titleTwo, number: data.countTwo },
        { heading: data.titleThree, number: data.countThree },
      ],
      hidden: data.hidden === "yes" ? true : false,
    };
    submitHandler(payload);
  };

  const watchAllFields = watch();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <pre>{JSON.stringify(watchAllFields, null, 2)}</pre> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[5.25rem]">
        <FormInput
          register={register}
          errorMessage={errors.titleOne?.message}
          labelText="Title One"
          inputType="default"
          name="titleOne"
          placeholder="Add a title"
        />
        <FormInput
          register={register}
          errorMessage={errors.titleTwo?.message}
          labelText="Title Two"
          inputType="default"
          name="titleTwo"
          placeholder="Add a title"
        />
        <FormInput
          register={register}
          errorMessage={errors.titleThree?.message}
          labelText="Title Three"
          inputType="default"
          name="titleThree"
          placeholder="Add a title"
        />
        <FormInput
          register={register}
          errorMessage={errors.countOne?.message}
          labelText="Count One"
          inputType="default"
          name="countOne"
          placeholder="Add a count"
        />
        <FormInput
          register={register}
          errorMessage={errors.countTwo?.message}
          labelText="Count Two"
          inputType="default"
          name="countTwo"
          placeholder="Add a count"
        />
        <FormInput
          register={register}
          errorMessage={errors.countThree?.message}
          labelText="Count Three"
          inputType="default"
          name="countThree"
          placeholder="Add a count"
        />
      </div>

      <div className="flex justify-center mt-[2.91rem]">
        <GrPowerReset
          onClick={() => reset()}
          className="w-[1.4695rem] h-[1.4695rem] hover:rotate-[360deg] transition ease-in-out duration-300 text-input-label cursor-pointer"
        />
      </div>

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
          Add Counters
        </Button>
      </div>
    </form>
  );
};

export default EditCounterForm;

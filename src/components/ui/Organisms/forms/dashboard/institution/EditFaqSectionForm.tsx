import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editFaqsFormSchema } from "@/validations";
import Button from "@/components/ui/Atoms/Button";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import { IInstitutionFaqForm } from "@/types";
import React from "react";

export interface IEditFaqSectionFormDefaultValues {
  data: {
    question: string;
    answer: string;
  }[];
  hidden: boolean;
}

export interface IEditFaqSectionFormProps {
  defaultValues: IEditFaqSectionFormDefaultValues | undefined;
  submitHandler: (data: IEditFaqSectionFormDefaultValues) => void;
}

const EditFaqSectionForm = ({
  submitHandler,
  defaultValues,
}: IEditFaqSectionFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<IInstitutionFaqForm>({
    resolver: yupResolver(editFaqsFormSchema),
    defaultValues: {
      faqs: defaultValues?.data
        ? defaultValues?.data.map((faq) => ({
            title: faq.question,
            description: faq.answer,
          }))
        : [{ title: "", description: "" }],
      hidden: defaultValues?.hidden
        ? defaultValues?.hidden
          ? "yes"
          : "no"
        : "no",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "faqs",
  });

  React.useEffect(() => {
    fields.forEach((field, index) => {
      setValue(`faqs.${index}.title` as const, field.title);
      setValue(`faqs.${index}.description` as const, field.description);
    });
    setValue(
      "hidden",
      defaultValues?.hidden ? (defaultValues?.hidden ? "yes" : "no") : "no"
    );
  }, [fields, setValue, defaultValues?.hidden ? defaultValues?.hidden : "no"]);

  const onSubmit: SubmitHandler<IInstitutionFaqForm> = (data) => {
    console.log(data);

    const payload = {
      hidden: data.hidden === "yes" ? true : false,
      data: data.faqs.map((faq) => ({
        question: faq.title,
        answer: faq.description,
      })),
    };
    submitHandler(payload);
  };

  const watchAllFields = watch();

  return (
    <form className="mt-[3rem] space-y-10" onSubmit={handleSubmit(onSubmit)}>
      {/* <pre>{JSON.stringify(watchAllFields, null, 2)}</pre> */}
      {fields.map((item, index) => (
        <div
          key={item.id}
          className="flex flex-col gap-[2rem] relative border border-input-border rounded-[1.25rem] p-6"
        >
          <FormInput
            register={register}
            labelText={`Faq Title ${index + 1}`}
            placeholder="Enter Faq Title"
            inputType="default"
            name={`faqs.${index}.title`}
            errorMessage={errors?.faqs?.[index]?.title?.message}
          />
          <FormInput
            register={register}
            labelText={`Description ${index + 1} `}
            placeholder="Description"
            inputType="default"
            name={`faqs.${index}.description`}
            errorMessage={errors?.faqs?.[index]?.description?.message}
          />

          {index > 0 && (
            <IoIosRemoveCircleOutline
              className="absolute w-[1.4695rem] h-[1.4695rem] hover:rotate-180 hover:scale-150 transition ease-in-out duration-800 right-5 top-5 text-red-500 cursor-pointer"
              onClick={() => remove(index)}
            />
          )}
        </div>
      ))}
      <div className="flex justify-center cursor-pointer">
        <IoIosAddCircleOutline
          className="w-[1.4695rem] h-[1.4695rem] hover:rotate-180 hover:scale-150 transition ease-in-out duration-800 text-app-purple"
          onClick={() =>
            append({
              title: "",
              description: "",
            })
          }
        />
      </div>

      <FormInput
        name="hidden"
        placeholder="Hidden?"
        register={register}
        errorMessage={errors?.hidden?.message}
        labelText="Do you want to hide this section?"
        selectOptions={["yes", "no"]}
        inputType="select"
      />

      <div className="flex justify-center gap-4 pb-6">
        <Button type="submit" btnColor="purple" className="w-48 mt-4">
          Add Faq
        </Button>
      </div>
    </form>
  );
};

export default EditFaqSectionForm;

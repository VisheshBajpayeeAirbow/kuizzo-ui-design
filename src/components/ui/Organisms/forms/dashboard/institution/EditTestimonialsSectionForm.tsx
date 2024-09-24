import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editTestimonialsFormSchema } from "@/validations";
import Button from "@/components/ui/Atoms/Button";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import { IInstitutionTestimonialForm } from "@/types";
import React from "react";

export interface IEditTestimonialsFormDefaultValues {
  data: {
    testimonial: string;
    title: string;
    ratings: number;
    imageUrl: string;
  }[];
  hidden: boolean;
}

export interface IEditTestimonialsSectionFormProps {
  submitHandler: (data: IEditTestimonialsFormDefaultValues) => void;
  defaultValues: IEditTestimonialsFormDefaultValues | undefined;
}

const EditTestimonialsSectionForm = ({
  submitHandler,
  defaultValues,
}: IEditTestimonialsSectionFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<IInstitutionTestimonialForm>({
    resolver: yupResolver(editTestimonialsFormSchema),
    defaultValues: {
      testimonials: defaultValues?.data
        ? defaultValues?.data.map((testimonial) => ({
            testimonialImage: testimonial.imageUrl,
            title: testimonial.title,
            testimonial: testimonial.testimonial,
            ratings: testimonial.ratings,
          }))
        : [{ testimonialImage: "", title: "", testimonial: "", ratings: 0 }],
      hidden: defaultValues?.hidden
        ? defaultValues?.hidden
          ? "yes"
          : "no"
        : "no",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "testimonials",
  });

  React.useEffect(() => {
    fields.forEach((field, index) => {
      setValue(
        `testimonials.${index}.testimonialImage`,
        field.testimonialImage
      );
      setValue(`testimonials.${index}.title`, field.title);
      setValue(`testimonials.${index}.testimonial`, field.testimonial);
      setValue(`testimonials.${index}.ratings`, field.ratings);
    });
    setValue(
      "hidden",
      defaultValues?.hidden ? (defaultValues?.hidden ? "yes" : "no") : "no"
    );
  }, [fields, setValue, defaultValues?.data ? defaultValues?.hidden : "no"]);

  const onSubmit: SubmitHandler<IInstitutionTestimonialForm> = (data) => {
    const payload = {
      data: data.testimonials.map((testimonial) => ({
        testimonial: testimonial.testimonial,
        title: testimonial.title,
        ratings: testimonial.ratings,
        imageUrl: testimonial.testimonialImage,
      })),
      hidden: data.hidden === "yes" ? true : false,
    };

    console.log(payload);
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
            labelText={`Testimonial Image ${index + 1}`}
            placeholder={`Testimonial Image ${index + 1}`}
            inputType="file"
            name={`testimonials.${index}.testimonialImage`}
            fileUploadType={["image/png", "image/jpeg", "image/jpg"]}
            imageUrl={
              defaultValues?.data ? defaultValues?.data[index]?.imageUrl : ""
            }
          />
          <FormInput
            register={register}
            labelText={`Testimonial Title ${index + 1}`}
            placeholder="Enter Testimonial Title"
            inputType="default"
            name={`testimonials.${index}.title`}
            errorMessage={errors?.testimonials?.[index]?.title?.message}
          />
          <FormInput
            register={register}
            labelText={`Testimonial ${index + 1} `}
            placeholder="Description"
            inputType="default"
            name={`testimonials.${index}.testimonial`}
            errorMessage={errors?.testimonials?.[index]?.testimonial?.message}
          />
          <FormInput
            register={register}
            labelText={`Rating ${index + 1} `}
            placeholder="Enter Rating"
            inputType="default"
            defaultInputTypeValue="number"
            name={`testimonials.${index}.ratings`}
            errorMessage={errors?.testimonials?.[index]?.ratings?.message}
          />

          {index > 0 && (
            <IoIosRemoveCircleOutline
              className="absolute w-[1.4695rem] h-[1.4695rem] right-5 top-5 hover:rotate-180 hover:scale-150 transition ease-in-out duration-800 text-red-500 cursor-pointer"
              onClick={() => remove(index)}
            />
          )}
        </div>
      ))}
      <div className="flex justify-center cursor-pointer">
        <IoIosAddCircleOutline
          className="w-[1.4695rem] h-[1.4695rem] text-app-purple hover:rotate-180 hover:scale-150 transition ease-in-out duration-800"
          onClick={() =>
            append({
              testimonialImage: "",
              title: "",
              testimonial: "",
              ratings: 0,
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
          Add Testimonial
        </Button>
      </div>
    </form>
  );
};

export default EditTestimonialsSectionForm;

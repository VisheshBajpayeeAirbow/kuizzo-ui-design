"use client";

import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import { IInstitutionContactUsForm } from "@/types";
import { institutionContactUsSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "../../Atoms/Button";
const ContactUsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInstitutionContactUsForm>({
    resolver: yupResolver(institutionContactUsSchema),
  });

  const onSubmit = (data: IInstitutionContactUsForm) => {
    console.log(data);
  };

  return (
    <form
      className=" mt-8 flex flex-col gap-6 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <FormInput
          register={register}
          errorMessage={errors.username?.message}
          labelText="Name"
          name="username"
          placeholder="Enter your name"
          inputType="default"
        />
        <FormInput
          register={register}
          errorMessage={errors.email?.message}
          labelText="Email"
          name="email"
          placeholder="Write your name"
          inputType="default"
        />
      </div>
      <FormInput
        register={register}
        errorMessage={errors.subject?.message}
        labelText="Subject"
        name="subject"
        placeholder="Write your name"
        inputType="default"
      />
      <FormInput
        register={register}
        errorMessage={errors.question?.message}
        labelText="Write your Question"
        name="question"
        placeholder="Any specific instructions or notes?"
        inputType="textarea"
      />
      <div className="md:w-1/4 mx-auto md:mb-[7.57rem]">
        <Button btnColor="purple">Send Message</Button>
      </div>
    </form>
  );
};

export default ContactUsForm;

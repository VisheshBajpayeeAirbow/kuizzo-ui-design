import React from "react";
import { useForm, Controller } from "react-hook-form";
import { nanoid } from "nanoid";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import SelectInput from "@/components/ui/Atoms/form/select/SelectInput";

const CourseMaterialsForm = () => {
  const { register, handleSubmit, control } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col md:flex-row gap-[2.75rem]">
        <Controller
          name="courseName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <SelectInput
              options={["1", "2", "3"]}
              handleSelectChange={(value) => field.onChange(value)}
              label="Course Name"
              id={nanoid()}
            />
          )}
        />
        <Controller
          name="subjects"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <SelectInput
              options={["1", "2", "3"]}
              handleSelectChange={(value) => field.onChange(value)}
              label="Subjects"
              id={nanoid()}
            />
          )}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-[2.75rem] mt-[2.04rem]">
        <Controller
          name="topics"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <SelectInput
              options={["1", "2", "3"]}
              handleSelectChange={(value) => field.onChange(value)}
              label="Topics"
              id={nanoid()}
            />
          )}
        />
        <Controller
          name="modules"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <SelectInput
              options={["1", "2", "3"]}
              handleSelectChange={(value) => field.onChange(value)}
              label="Modules"
              id={nanoid()}
            />
          )}
        />
      </div>
      <div className="mt-[2.04rem]">
        <FormInput
          labelText="Upload Course Materials"
          name="courseMaterials"
          placeholder="Upload Course Materials"
          register={register}
          inputType="file"
        />
      </div>
      <div className="mt-[2.04rem]">
        <FormInput
          register={register}
          labelText="Youtube URL:"
          placeholder="Enter youtube URL"
          inputType="default"
          name="youtubeUrl"
        />
      </div>
      <div className="w-[12.125rem] h-[3.9375rem] md:mt-[3.33rem] bg-transparent border-[2px] border-app-purple rounded-[2.5rem] flex justify-center items-center py-[1.75rem] px-[4.12rem] text-nowrap">
        <button type="submit">Add Materials</button>
      </div>
    </form>
  );
};

export default CourseMaterialsForm;

import Button from "@/components/ui/Atoms/Button";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import {
  setActiveStep,
  setCreateCourseForm,
} from "@/features/courseSlice/courseSlice";
import { RootState } from "@/store/store";
import { coursesFormSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export interface ICourseForm {
  courseName: string;
  courseDescription: string;
  courseObjective: string;
  youtubeUrl?: string;
  courseMaterials?: any;
}

export interface ICourseFormProps {
  mode: "create" | "edit";
}

const CourseForm = ({ mode }: ICourseFormProps) => {
  const defaultCourseValues = useSelector(
    (state: RootState) => state.course.createCourseForm
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICourseForm>({
    resolver: yupResolver(coursesFormSchema),
    defaultValues: mode === "edit" ? defaultCourseValues : undefined,
  });

  const dispatch = useDispatch();
  const onSubmit = async (data: any) => {
    if (data.courseMaterials && data.courseMaterials.length > 0) {
      const { courseMaterials } = data;
      dispatch(
        setCreateCourseForm({ ...data, courseMaterials: courseMaterials[0] })
      );
    } else {
      const { courseMaterials, ...restData } = data;
      dispatch(setCreateCourseForm(restData));
    }
    dispatch(setActiveStep("subject"));
    toast.success(
      `Course details ${mode === "edit" ? "Updated" : "Created"} successfully`
    );
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-[3.13rem] pb-[3.16rem] ">
          <FormInput
            register={register}
            labelText="Course Name"
            placeholder="Enter Course Name"
            inputType="default"
            name="courseName"
            errorMessage={errors?.courseName?.message}
          />
          <FormInput
            register={register}
            labelText="Course Description"
            placeholder="Enter Course Description"
            inputType="textarea"
            name="courseDescription"
            errorMessage={errors?.courseDescription?.message}
          />
          <FormInput
            register={register}
            labelText="Course Objective"
            name="courseObjective"
            placeholder="Enter Course Objectives"
            inputType="textarea"
            errorMessage={errors?.courseObjective?.message}
          />

          <FormInput
            register={register}
            labelText="Youtube Link"
            placeholder="Enter Youtube Link"
            inputType="default"
            name="youtubeUrl"
            // not a mandatory field
            // errorMessage={errors?.youtubeUrl?.message}
          />

          <FormInput
            register={register}
            labelText="Course Material"
            name="courseMaterials"
            placeholder="Enter Course Materials"
            inputType="file"
            fileInputTypeInfo="CSV and PDF files only"
            fileUploadType={["text/csv", "application/pdf"]}
            resetFileUpload={reset}

            // not a mandatory field
            // errorMessage={errors?.courseMaterials?.message?.toString()}
          />
        </div>

        <div className="flex justify-center gap-[1.69rem] pb-[6.13rem]">
          <Button
            type="submit"
            className="w-[12.125rem] mt-[4.97rem]"
            btnColor="purple"
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;

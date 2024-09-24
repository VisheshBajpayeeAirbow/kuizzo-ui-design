import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { courseSubjectFormSchema } from "@/validations";
import Button from "@/components/ui/Atoms/Button";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import {
  setActiveStep,
  setCreateSubjectForm,
} from "@/features/courseSlice/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import toast from "react-hot-toast";

export interface ICourseSubjectFormProps {
  mode: "create" | "edit";
}

// Define the form data type
export interface ICourseSubjectsForm {
  subjects: {
    subjectName: string;
    subjectDescription: string;
  }[];
}

const CourseSubjectForm = ({ mode }: ICourseSubjectFormProps) => {
  const defaultStateValues = useSelector(
    (state: RootState) => state.course.createSubjectForm
  );
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICourseSubjectsForm>({
    resolver: yupResolver(courseSubjectFormSchema),
    defaultValues: defaultStateValues,
  });

  const dispatch = useDispatch();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjects",
  });

  const onSubmit: SubmitHandler<ICourseSubjectsForm> = (data) => {
    console.log(data);
    dispatch(setCreateSubjectForm(data));
    dispatch(setActiveStep("topic"));
    toast.success(
      `Subjects ${mode === "edit" ? "Updated" : "Created"} successfully`
    );
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <form className="mt-[3rem] space-y-10" onSubmit={handleSubmit(onSubmit)}>
      {fields.map((item, index) => (
        <div
          key={item.id}
          className="flex flex-col gap-[2rem] relative border border-input-border rounded-[1.25rem] p-6"
        >
          <FormInput
            register={register}
            labelText={`Subject Name ${index + 1}`}
            placeholder="Enter Subject Name"
            inputType="default"
            name={`subjects[${index}].subjectName`}
            errorMessage={errors?.subjects?.[index]?.subjectName?.message}
          />
          <FormInput
            register={register}
            labelText={`Subject Description ${index + 1}`}
            placeholder="Enter Subject Description"
            inputType="textarea"
            name={`subjects[${index}].subjectDescription`}
            errorMessage={
              errors?.subjects?.[index]?.subjectDescription?.message
            }
          />

          {index > 0 && (
            <IoIosRemoveCircleOutline
              className="absolute w-[1.4695rem] h-[1.4695rem] right-5 top-5 text-red-500 cursor-pointer hover:rotate-180 hover:scale-150 transition ease-in-out duration-800"
              onClick={() => remove(index)}
            />
          )}
        </div>
      ))}
      <div className="flex justify-center cursor-pointer">
        <IoIosAddCircleOutline
          className="w-[1.4695rem] h-[1.4695rem] text-app-purple hover:rotate-180 hover:scale-150 transition ease-in-out duration-800"
          onClick={() => append({ subjectName: "", subjectDescription: "" })}
        />
      </div>

      <div className="flex justify-center gap-4 pb-6">
        <Button
          onClick={() => {
            dispatch(setActiveStep("course"));
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          type="button"
          btnColor="purple"
          className="w-48 mt-4"
        >
          Previous
        </Button>
        <Button type="submit" btnColor="purple" className="w-48 mt-4">
          {mode === "edit" ? "Update Subject" : "Create Subject"}
        </Button>
      </div>
    </form>
  );
};

export default CourseSubjectForm;

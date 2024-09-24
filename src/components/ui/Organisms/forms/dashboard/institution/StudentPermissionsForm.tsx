import Button from "@/components/ui/Atoms/Button";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import { editStudentPermissionsFormSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
export interface IStudentPermissionsForm {
  createQuiz: boolean;
  createExam: boolean;
}
export interface IStudentPermissionsFormProps {
  submitHandler: (data: any) => void;
  defaultValues: IStudentPermissionsForm | undefined;
}

const StudentPermissionsForm = ({
  submitHandler,
  defaultValues,
}: IStudentPermissionsFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IStudentPermissionsForm>({
    resolver: yupResolver(editStudentPermissionsFormSchema),
    defaultValues: {
      createQuiz: defaultValues?.createQuiz,
      createExam: defaultValues?.createExam,
    },
  });

  const onSubmit = (data: IStudentPermissionsForm) => {
    submitHandler(data);
    console.log("INSTRUCTOR PERMISSIONS", data);
  };

  const watchAllFields = watch();

  return (
    <form className="space-y-4 b-[3rem]" onSubmit={handleSubmit(onSubmit)}>
      {/* <pre>{JSON.stringify(watchAllFields, null, 2)}</pre> */}
      <FormInput
        register={register}
        labelText="Create Quiz"
        name="createQuiz"
        placeholder="Create Quiz"
        inputType="checkbox"
      />
      <FormInput
        register={register}
        labelText="Create Exam"
        name="createExam"
        placeholder="Create Exam"
        inputType="checkbox"
      />
      <div className="flex justify-center gap-4 pb-6">
        <Button btnColor="purple" type="submit" className="w-48 mt-4">
          Add Permissions
        </Button>
      </div>
    </form>
  );
};

export default StudentPermissionsForm;

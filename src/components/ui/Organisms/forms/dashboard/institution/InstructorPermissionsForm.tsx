import Button from "@/components/ui/Atoms/Button";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import { editInstructorPermissionsFormSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export interface IInstructorPermissionsForm {
  createCourse: boolean;
  createQuizAndExam: boolean;
  addStudents: boolean;
  addInstructor: boolean;
  billingAndPayments: boolean;
}

export interface IInstructorPermissionsFormProps {
  submitHandler: (data: IInstructorPermissionsForm) => void;
  defaultValues: IInstructorPermissionsForm | undefined;
}

const InstructorPermissionsForm = ({
  submitHandler,
  defaultValues,
}: IInstructorPermissionsFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IInstructorPermissionsForm>({
    resolver: yupResolver(editInstructorPermissionsFormSchema),
    defaultValues: {
      createCourse: defaultValues?.createCourse,
      createQuizAndExam: defaultValues?.createQuizAndExam,
      addStudents: defaultValues?.addStudents,
      addInstructor: defaultValues?.addInstructor,
      billingAndPayments: defaultValues?.billingAndPayments,
    },
  });

  const onSubmit = (data: IInstructorPermissionsForm) => {
    submitHandler(data);
    console.log("INSTRUCTOR PERMISSIONS", data);
  };

  const watchAllFields = watch();

  return (
    <form className="space-y-4 mb-[3rem]" onSubmit={handleSubmit(onSubmit)}>
      {/* <pre>{JSON.stringify(watchAllFields, null, 2)}</pre> */}
      <FormInput
        register={register}
        labelText="Create Course"
        name="createCourse"
        placeholder="Create Course"
        inputType="checkbox"
      />
      <FormInput
        register={register}
        labelText="Create Quiz and Exam"
        name="createQuizAndExam"
        placeholder="Create Quiz and Exam"
        inputType="checkbox"
      />
      <FormInput
        register={register}
        labelText="Add Students"
        name="addStudents"
        placeholder="Add Students"
        inputType="checkbox"
      />
      <FormInput
        register={register}
        labelText="Add Instructor"
        name="addInstructor"
        placeholder="Add Instructor"
        inputType="checkbox"
      />
      <FormInput
        register={register}
        labelText="Billing And Payments"
        name="billingAndPayments"
        placeholder="Billing And Payments"
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

export default InstructorPermissionsForm;

import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/custom/dialog";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { editStudentDialogFormSchema } from "@/validations";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import Button from "../../Atoms/Button";
import { IEditStudentDialogProps, IStudentDialogForm } from "@/types";
import { useUpdateStudentMutation } from "@/server/mutations";
import { IStudentData } from "@/types/api";
import {
  useGetAllInstructorsByInstituteId,
  useGetCoursesByInstituteId,
} from "@/server/queries";
import Spinner from "../../Atoms/Spinner";

const EditStudentDialog = ({
  dialogToggle,
  dataToBeEdited,
  originalData,
  instituteId,
  setDialogToggle,
}: IEditStudentDialogProps) => {
  console.log("dataToBeEdited: ", dataToBeEdited);
  const updateStudentMutation = useUpdateStudentMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IStudentDialogForm>({
    resolver: yupResolver(editStudentDialogFormSchema),
    defaultValues: {
      title: dataToBeEdited?.title,
      username: dataToBeEdited?.username,
      email: dataToBeEdited?.email,
      instructorId: dataToBeEdited?.instructorId,
      createExam: dataToBeEdited?.createExam,
      createQuiz: dataToBeEdited?.createQuiz,
      courseId: dataToBeEdited?.courseId,
    },
  });

  // queries
  const { data: coursesData, isLoading: coursesLoading } =
    useGetCoursesByInstituteId(instituteId);
  const { data: instructorData, isLoading: instructorLoading } =
    useGetAllInstructorsByInstituteId(instituteId);

  const onSubmit: SubmitHandler<IStudentDialogForm> = (data) => {
    console.log("EDITED STUDENT DATA: ", data);

    // payload
    const payload: IStudentData = {
      courseId: data.courseId,
      instituteId: originalData?.instituteId,
      instructorId: data.instructorId,
      title: data.title,
      username: data.username,
      email: data.email,
      password: originalData?.password,
      profileImage: originalData?.profileImage,
      subscription: originalData?.subscription,
      verified: originalData?.verified,
      permissions: {
        createExam: data.createExam,
        createQuiz: data.createQuiz,
      },
    };

    if (originalData && originalData.id !== undefined) {
      console.log("PAYLOAD TRIGGERED FOR EDIT STUDENT: ", originalData);
      updateStudentMutation.mutate({ id: originalData?.id, data: payload });
    }
    setDialogToggle(false);
  };

  useEffect(() => {
    console.log("DATA TO BE EDITED: ", dataToBeEdited);
    reset({ ...dataToBeEdited });
  }, [dataToBeEdited, reset]);

  if (coursesLoading || instructorLoading) return <Spinner />;

  return (
    <Dialog open={dialogToggle} onOpenChange={(open) => setDialogToggle(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormInput
              register={register}
              placeholder="Enter Student Name"
              labelText="Student Name"
              name="title"
              inputType="default"
              errorMessage={errors.title?.message}
            />
            <FormInput
              register={register}
              placeholder="Enter Username"
              labelText="Username"
              name="username"
              inputType="default"
              errorMessage={errors.username?.message}
            />
            <FormInput
              register={register}
              placeholder="Enter  Email"
              labelText="Instructor Email"
              name="email"
              inputType="default"
              errorMessage={errors.email?.message}
            />
            <FormInput
              register={register}
              placeholder="Enter Course"
              labelText="Assigned Course"
              name="courseId"
              inputType="select"
              selectOptions={coursesData?.courses.map((course) => ({
                id: course.id,
                value: course.courseName,
              }))}
            />
            {/* if no instructors are present, dont show the instructors select input */}
            {instructorData && instructorData.length > 0 && (
              <FormInput
                register={register}
                placeholder="Select Instructor"
                labelText="Instructor Name"
                name="instructorId"
                inputType="select"
                selectOptions={instructorData?.map((instructor) => {
                  return {
                    id: instructor.id,
                    value: instructor.title,
                  };
                })}
                errorMessage={errors.instructorId?.message}
              />
            )}
          </div>

          <div className="space-y-[0.5rem] mt-[1rem]">
            <label
              className="text-input-label text-[0.875rem] font-semibold leading-[115%] tracking-[0.04375rem]"
              htmlFor="permissions"
            >
              Permissions
            </label>

            <FormInput
              register={register}
              placeholder="Enter Permissions"
              labelText="Create Quizes"
              name="createQuiz"
              inputType="checkbox"
            />
            <FormInput
              register={register}
              placeholder="Enter Permissions"
              labelText="Create Exams"
              name="createExam"
              inputType="checkbox"
            />
          </div>

          <Button className="mt-4 h-10" type="submit">
            Edit Student
          </Button>
        </form>
        <DialogDescription></DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default EditStudentDialog;

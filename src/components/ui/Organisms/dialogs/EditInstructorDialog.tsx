import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/custom/dialog";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { editInstructorDialogFormSchema } from "@/validations";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import Button from "../../Atoms/Button";
import { IEditInstructorDialogProps, IInstructorDialogForm } from "@/types";
import { IInstructorData } from "@/types/api";
import { useUpdateInstructorMutation } from "@/server/mutations";
import { useGetCoursesByInstituteId } from "@/server/queries";
import Spinner from "../../Atoms/Spinner";
import MultipleSelector, { Option } from "@/components/custom/multi-select";
import toast from "react-hot-toast";

const EditInstructorDialog = ({
  instituteId,
  dialogToggle,
  dataToBeEdited,
  originalData,
  setDialogToggle,
}: IEditInstructorDialogProps) => {
  const [selectedCourses, setSelectedCourses] = useState<Option[]>([]);
  // mutations
  const updateInstructorMutation = useUpdateInstructorMutation();
  // queries
  const {
    data: coursesData,
    isLoading: coursesLoading,
    isError,
    error,
  } = useGetCoursesByInstituteId(instituteId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IInstructorDialogForm>({
    resolver: yupResolver(editInstructorDialogFormSchema),
    defaultValues: {
      email: dataToBeEdited?.email,
      title: dataToBeEdited?.title,
      username: dataToBeEdited?.username,
      addInstructor: dataToBeEdited?.addInstructor,
      addStudents: dataToBeEdited?.addStudents,
      billingAndPayments: dataToBeEdited?.billingAndPayments,
      createCourse: dataToBeEdited?.createCourse,
      createQuizAndExam: dataToBeEdited?.createQuizAndExam,
    },
  });

  const onSubmit: SubmitHandler<IInstructorDialogForm> = (data) => {
    console.log("EDITED INSTRUCTOR DATA: ", data);

    // Construct the payload
    const payload: IInstructorData = {
      instituteId: originalData?.instituteId,
      title: data.title,
      username: data.username,
      password: originalData?.password,
      email: data.email,
      profileImage: originalData?.profileImage,
      subscription: originalData?.subscription,
      verified: originalData?.verified,
      // get from multi select state
      courseIds: selectedCourses.map((course) => course.value) as string[],
      permissions: {
        addInstructor: data.addInstructor,
        addStudents: data.addStudents,
        billingAndPayments: data.billingAndPayments,
        createCourse: data.createCourse,
        createQuizAndExam: data.createQuizAndExam,
      },
    };

    if (originalData && originalData.id !== undefined) {
      updateInstructorMutation.mutate({ id: originalData?.id, data: payload });
    }
    setDialogToggle(false);
  };

  useEffect(() => {
    reset({
      ...dataToBeEdited,
      courseIds: selectedCourses.map((course) => course.value), // to include courseIds in the reset
    });
  }, [dataToBeEdited, reset]);

  useEffect(() => {
    if (coursesData?.courses && dataToBeEdited?.courseIds) {
      const selectedCourseIds: Option[] = coursesData.courses
        .filter((course) =>
          (dataToBeEdited.courseIds || []).includes(course.id as string)
        )
        .map((course) => ({
          value: course.id as string,
          label: course.courseName as string,
        }));

      setSelectedCourses(selectedCourseIds);
    }
  }, [coursesData, dataToBeEdited]);

  if (coursesLoading) return <Spinner loadingText="Fetching Courses" />;
  if (isError) throw new Error(error.message);

  return (
    <Dialog open={dialogToggle} onOpenChange={(open) => setDialogToggle(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Instructor</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3">
            <FormInput
              register={register}
              placeholder="Enter Instructor Name"
              labelText="Instructor Name"
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

            <MultipleSelector
              selectLabel="Courses"
              options={
                coursesData?.courses.map((course) => ({
                  value: course.id as string,
                  label: course.courseName as string,
                })) as Option[]
              }
              value={selectedCourses}
              maxSelected={5}
              onMaxSelected={(maxLimit: number) =>
                toast.error(`You can't select more than ${maxLimit}`)
              }
              onChange={(value) => setSelectedCourses(value)}
              placeholder="Select frameworks you like..."
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  no results found.
                </p>
              }
            />

            {/* <FormInput
              register={register}
              placeholder="Enter Course"
              labelText="Assigned Course"
              name="courseId"
              inputType="select"
              selectOptions={coursesData?.courses.map((course) => ({
                id: course.id,
                value: course.courseName,
              }))}
            /> */}
          </div>

          <div className="space-y-[0.3rem] mt-[1rem]">
            <label
              className="text-input-label text-[0.875rem] font-semibold leading-[115%] tracking-[0.04375rem]"
              htmlFor="permissions"
            >
              Permissions
            </label>
            <FormInput
              register={register}
              placeholder="Enter Permissions"
              labelText="Create Course"
              name="createCourse"
              inputType="checkbox"
            />
            <FormInput
              register={register}
              placeholder="Enter Permissions"
              labelText="Create Quizes or Exams"
              name="createQuizAndExam"
              inputType="checkbox"
            />
            <FormInput
              register={register}
              placeholder="Enter Permissions"
              labelText="Add Students"
              name="addStudents"
              inputType="checkbox"
            />
            <FormInput
              register={register}
              placeholder="Enter Permissions"
              labelText="Add Instructors"
              name="addInstructor"
              inputType="checkbox"
            />
            <FormInput
              register={register}
              placeholder="Enter Permissions"
              labelText="Access to Billing and Payments"
              name="billingAndPayments"
              inputType="checkbox"
            />
          </div>

          <div className="flex justify-between gap-[2rem] mt-4">
            <Button btnColor="purple" type="submit">
              Done
            </Button>

            <Button
              onClick={() => setDialogToggle(false)}
              className="bg-rose-500"
              type="button"
            >
              Cancel
            </Button>
          </div>
        </form>
        <DialogDescription></DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default EditInstructorDialog;

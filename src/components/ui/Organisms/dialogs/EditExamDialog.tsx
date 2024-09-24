import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/custom/dialog";
import React, { useEffect, useState } from "react";
import { editExamDialogFormSchema } from "@/validations";
import Button from "../../Atoms/Button";
import FormInput from "../../Atoms/form/input/FormInput";
import toast from "react-hot-toast";
import { IEditExamDialogProps, IExamEditObject } from "@/types";
import { useGetCoursesByInstituteId } from "@/server/queries";
import { useUpdateExamByIdMutation } from "@/server/mutations";
import Spinner from "../../Atoms/Spinner";

const EditExamDialog = ({
  dataToBeEdited,
  dialogToggle,
  instituteId,
  setDialogToggle,
}: IEditExamDialogProps) => {
  const [filteredSubjects, setFilteredSubjects] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IExamEditObject>({
    resolver: yupResolver(editExamDialogFormSchema),
    defaultValues: dataToBeEdited,
  });

  const {
    data: coursesData,
    isError: coursesIsError,
    error: coursesError,
  } = useGetCoursesByInstituteId(instituteId);

  const updateExamMutation = useUpdateExamByIdMutation();

  const courseOptions = coursesData?.courses.map((course) => course.courseName);

  // create map for subjects
  const subjectsMap = new Map<string, string[]>();

  coursesData?.courses.forEach((course) => {
    const courseSubjects = course.subjects.map(
      (subject) => subject.subjectName
    );
    subjectsMap.set(course.courseName, courseSubjects);
  });

  const watchCourse = watch("course");
  const onSubmit: SubmitHandler<IExamEditObject> = (data) => {
    console.log("EDITED EXAM DATA: ", data);
    const editExamPayload = {
      course: data.course,
      examName: data.examName,
      subject: data.subject,
    };

    updateExamMutation.mutate({
      examId: data.id as string,
      examData: editExamPayload,
    });
    toast.success("EDITED EXAM LOGGED SUCCESSFULLY");
    setDialogToggle(false);
  };

  useEffect(() => {
    if (watchCourse) {
      setFilteredSubjects(subjectsMap.get(watchCourse) || []);
    }
  }, [watchCourse]);

  useEffect(() => {
    reset(dataToBeEdited);
  }, [reset, dataToBeEdited]);

  if (updateExamMutation.isPending)
    return <Spinner loadingText="Updating Exam" />;

  if (coursesIsError) return <div>ERROR OCCURED: {coursesError.message}</div>;
  return (
    <Dialog open={dialogToggle} onOpenChange={(open) => setDialogToggle(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Exam</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormInput
              register={register}
              placeholder="Quiz Name"
              labelText="Quiz Name"
              name="examName"
              inputType="default"
              errorMessage={errors.examName?.message}
            />
            <FormInput
              labelText="Course:"
              name="course"
              placeholder="Select Course"
              register={register}
              selectOptions={courseOptions}
              inputType="select"
              errorMessage={errors?.course?.message}
            />
            <FormInput
              labelText="Subject:"
              name="subject"
              placeholder="Select Subject"
              register={register}
              inputType="select"
              selectOptions={filteredSubjects}
              errorMessage={errors?.subject?.message}
            />
          </div>

          <Button type="submit">Edit Exam</Button>
        </form>
        <DialogDescription></DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default EditExamDialog;

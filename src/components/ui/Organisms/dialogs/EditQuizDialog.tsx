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
import { editQuizDialogFormSchema } from "@/validations";
import Button from "../../Atoms/Button";
import FormInput from "../../Atoms/form/input/FormInput";
import toast from "react-hot-toast";
import { IEditQuizDialogProps, IQuizEditObject } from "@/types";
import { useGetCoursesByInstituteId } from "@/server/queries";
import Spinner from "../../Atoms/Spinner";
import { useUpdateQuizById } from "@/server/mutations";

const EditQuizDialog = ({
  instituteId,
  dataToBeEdited,
  dialogToggle,
  setDialogToggle,
}: IEditQuizDialogProps) => {
  const [filteredSubjects, setFilteredSubjects] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IQuizEditObject>({
    resolver: yupResolver(editQuizDialogFormSchema),
    defaultValues: dataToBeEdited,
  });

  const {
    data: coursesData,
    isError: coursesIsError,
    error: coursesError,
  } = useGetCoursesByInstituteId(instituteId);

  const updateQuizMutation = useUpdateQuizById();

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

  const onSubmit: SubmitHandler<IQuizEditObject> = (data) => {
    console.log("EDITED QUIZ DATA: ", data);
    const editQuizPayload = {
      course: data.course,
      quizName: data.quizName,
      subject: data.subject,
    };

    updateQuizMutation.mutate({
      quizId: data.id as string,
      quizData: editQuizPayload,
    });

    toast.success("EDITED QUIZ LOGGED SUCCESSFULLY");
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

  if (updateQuizMutation.isPending)
    return <Spinner loadingText="Updating Quiz" />;
  if (coursesIsError) return <div>ERROR OCCURED: {coursesError.message}</div>;

  return (
    <Dialog open={dialogToggle} onOpenChange={(open) => setDialogToggle(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Quiz</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormInput
              register={register}
              placeholder="Quiz Name"
              labelText="Quiz Name"
              name="quizName"
              inputType="default"
              errorMessage={errors.quizName?.message}
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

          <Button type="submit">Edit Quiz</Button>
        </form>
        <DialogDescription></DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default EditQuizDialog;

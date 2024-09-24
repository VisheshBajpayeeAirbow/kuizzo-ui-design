"use client";
import Spinner from "@/components/ui/Atoms/Spinner";
import CustomTable from "@/components/ui/Organisms/CustomTable";
import DefaultDialog from "@/components/ui/Organisms/dialogs/DefaultDialog";
import { PATHS } from "@/constants";
import {
  setStudentTestExamData,
  setActiveTestType,
} from "@/features/studentTestSlice/studentTestSlice";
import { studentExamColumnMapping } from "@/mappings";
import { useGetAllExamsByCourseId } from "@/server/queries";
import { IExamData } from "@/types/api";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { GrTest } from "react-icons/gr";
import { useDispatch } from "react-redux";

const StudentExamListPage = () => {
  const [dialogToggle, setDialogToggle] = useState<boolean>(false);
  const [examDataForTest, setExamDataForTest] = useState<IExamData>();
  const { courseId } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleTriggerTest = () => {
    dispatch(setStudentTestExamData(examDataForTest as IExamData));
    dispatch(setActiveTestType("exam"));
    router.push(PATHS.studentQuestionsPage);
  };

  const handleOpenDialog = (examData: IExamData) => {
    setDialogToggle((prevState) => !prevState);
    setExamDataForTest(examData);
  };

  const examTableActionsObject = [{ icon: GrTest, handler: handleOpenDialog }];

  const { data, isLoading, isError } = useGetAllExamsByCourseId(
    courseId as string
  );

  if (isLoading) return <Spinner loadingText="Loading Exams" />;
  if (isError) throw new Error("Error while fetching exams");

  return (
    <>
      <CustomTable
        tableData={data as any}
        tableColumns={studentExamColumnMapping}
        pageSize={5}
        hasActions={true}
        header="Exams List"
        actionIcons={examTableActionsObject}
      />
      <DefaultDialog
        dialogHandler={handleTriggerTest}
        dialogToggle={dialogToggle}
        setDialogToggle={setDialogToggle}
        buttonOneText="Start Test"
        buttonTwoText="I come back later"
        dialogTitle="Do not refresh or change the page while taking the quiz, as it may result in losing your progress."
      />
    </>
  );
};

export default StudentExamListPage;

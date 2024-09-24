"use client";
import Spinner from "@/components/ui/Atoms/Spinner";
import CustomTable from "@/components/ui/Organisms/CustomTable";
import DefaultDialog from "@/components/ui/Organisms/dialogs/DefaultDialog";
import { PATHS } from "@/constants";
import {
  setActiveTestType,
  setStudentTestQuizData,
} from "@/features/studentTestSlice/studentTestSlice";
import { studentQuizColumnMapping } from "@/mappings";
import { useGetAllQuizesByCourseId } from "@/server/queries";
import { IQuizData } from "@/types/api";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { GrTest } from "react-icons/gr";
import { useDispatch } from "react-redux";

const StudentQuizListPage = () => {
  const [dialogToggle, setDialogToggle] = useState<boolean>(false);
  const [quizDataForTest, setQuizDataForTest] = useState<IQuizData>();
  const { courseId } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleTriggerTest = () => {
    dispatch(setStudentTestQuizData(quizDataForTest as IQuizData));
    dispatch(setActiveTestType("quiz"));
    router.push(PATHS.studentQuestionsPage);
  };

  const handleOpenDialog = (examData: IQuizData) => {
    setDialogToggle((prevState) => !prevState);
    setQuizDataForTest(examData);
  };

  const quizTableActionsObject = [{ icon: GrTest, handler: handleOpenDialog }];

  const { data, isLoading, isError } = useGetAllQuizesByCourseId(
    courseId as string
  );
  if (isLoading) return <Spinner loadingText="Loading Quizes" />;
  if (isError) throw new Error("Error while fetching quizes");
  return (
    <>
      <CustomTable
        tableData={data as any}
        tableColumns={studentQuizColumnMapping}
        pageSize={5}
        hasActions={true}
        header="Quiz List"
        actionIcons={quizTableActionsObject}
      />
      <DefaultDialog
        dialogHandler={handleTriggerTest}
        dialogToggle={dialogToggle}
        setDialogToggle={setDialogToggle}
        buttonOneText="Start Test"
        buttonTwoText="I come back later"
        dialogTitle="Please do not refresh the page while taking the quiz, as it may result in losing your progress."
      />
    </>
  );
};

export default StudentQuizListPage;

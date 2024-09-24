"use client";
import Spinner from "@/components/ui/Atoms/Spinner";
import CustomTable from "@/components/ui/Organisms/CustomTable";
import DeleteDialog from "@/components/ui/Organisms/dialogs/DeleteDialog";
import EditQuizDialog from "@/components/ui/Organisms/dialogs/EditQuizDialog";
import { quizColumnMapping } from "@/mappings";
import { useDeleteQuiz } from "@/server/mutations";
import { useGetAllQuizesByInstituteId } from "@/server/queries";
import { IQuizEditObject } from "@/types";
import { useState } from "react";

const QuizListPage = ({ instituteId }: { instituteId: string }) => {
  const [dialogToggle, setDialogToggle] = useState<boolean>(false);
  const [deleteDialogToggle, setDeleteDialogToggle] = useState(false);
  const [dataToBeDeletedId, setDataToBeDeletedId] = useState();
  const [dataToBeEdited, setDataToBeEdited] = useState<IQuizEditObject>({
    course: "DEFAULT COURSE NAME",
    quizName: "DEFAULT QUIZ NAME",
    subject: "DEFAULT SUBJECT NAME",
  });

  // query
  const {
    data: quizData,
    isLoading,
    isError,
    error,
  } = useGetAllQuizesByInstituteId(instituteId);

  // mutation
  const deleteQuizMutation = useDeleteQuiz();

  const quizTableData = quizData?.quizzes.map(
    ({ quizName, course, subject, id }) => ({
      quizName,
      course,
      subject,
      id,
    })
  );

  const handleEditQuiz = (editData: IQuizEditObject) => {
    setDialogToggle((prevState) => !prevState);
    setDataToBeEdited(editData);
    console.log("EDITED QUIZ DATA: ", editData);
  };

  const handleDeleteQuiz = () => {
    if (dataToBeDeletedId) {
      deleteQuizMutation.mutate(dataToBeDeletedId);
    }
  };

  const handleOpenDeleteQuizDialog = (deleteData: any) => {
    setDeleteDialogToggle((prevState) => !prevState);
    console.log("DELETED QUIZ DATA: ", deleteData);
    setDataToBeDeletedId(deleteData.id);
  };

  if (isLoading) return <Spinner loadingText="Fetching Quizes" />;
  if (isError) return <div>ERROR OCCURED: {error.message}</div>;

  return (
    <div>
      {/* <pre>{JSON.stringify(quizData, null, 2)}</pre> */}
      <CustomTable
        tableColumns={quizColumnMapping}
        tableData={
          quizTableData as {
            quizName: string;
            course: string;
            subject: string;
            id: string | undefined;
          }[]
        }
        pageSize={6}
        hasActions
        header="Quiz List"
        handleEdit={handleEditQuiz}
        handleDelete={handleOpenDeleteQuizDialog}
      />
      <EditQuizDialog
        instituteId={instituteId}
        dataToBeEdited={dataToBeEdited}
        dialogToggle={dialogToggle}
        setDialogToggle={setDialogToggle}
      />

      <DeleteDialog
        dialogTitle="Are you sure you want to delete this quiz?"
        dialogToggle={deleteDialogToggle}
        setDialogToggle={setDeleteDialogToggle}
        dialogHandler={handleDeleteQuiz}
      />
    </div>
  );
};

export default QuizListPage;

"use client";
import Spinner from "@/components/ui/Atoms/Spinner";
import CustomTable from "@/components/ui/Organisms/CustomTable";
import DeleteDialog from "@/components/ui/Organisms/dialogs/DeleteDialog";
import EditExamDialog from "@/components/ui/Organisms/dialogs/EditExamDialog";
import { examColumnMapping } from "@/mappings";
import { useDeleteExamMutation } from "@/server/mutations";
import { useGetAllExamsByInstituteId } from "@/server/queries";
import { IExamEditObject } from "@/types";
import React, { useState } from "react";

const ExamListPage = ({ instituteId }: { instituteId: string }) => {
  const [dialogToggle, setDialogToggle] = useState<boolean>(false);
  const [deleteDialogToggle, setDeleteDialogToggle] = useState(false);
  const [dataToBeDeletedId, setDataToBeDeletedId] = useState();
  const [dataToBeEdited, setDataToBeEdited] = useState<IExamEditObject>({
    course: "DEFAULT COURSE NAME",
    examName: "DEFAULT EXAM NAME",
    subject: "DEFAULT SUBJECT NAME",
  });

  // query
  const {
    data: examData,
    isLoading,
    isError,
    error,
  } = useGetAllExamsByInstituteId(instituteId);

  // mutation
  const deleteExamMutation = useDeleteExamMutation();

  const examTableData = examData?.exams.map(
    ({ examName, course, subject, id }) => ({
      examName,
      course,
      subject,
      id,
    })
  );

  const handleEditExam = (editData: IExamEditObject) => {
    setDialogToggle((prevState) => !prevState);
    setDataToBeEdited(editData);
    console.log("EDITED Exam DATA: ", editData);
  };

  const handleDeleteQuiz = () => {
    if (dataToBeDeletedId) {
      deleteExamMutation.mutate(dataToBeDeletedId);
    }
  };

  const handleOpenDeleteQuizDialog = (deleteData: any) => {
    setDeleteDialogToggle((prevState) => !prevState);
    console.log("DELETED EXAM DATA: ", deleteData);
    setDataToBeDeletedId(deleteData.id);
  };

  if (isLoading) return <Spinner loadingText="Fetching Exams" />;
  if (isError) return <div>ERROR OCCURED: {error.message}</div>;

  return (
    <div>
      {/* <pre>{JSON.stringify(examData, null, 2)}</pre> */}
      <CustomTable
        tableColumns={examColumnMapping}
        tableData={
          examTableData as {
            examName: string;
            course: string;
            subject: string;
            id: string | undefined;
          }[]
        }
        pageSize={6}
        hasActions
        header="Exam List"
        handleEdit={handleEditExam}
        handleDelete={handleOpenDeleteQuizDialog}
      />

      <EditExamDialog
        instituteId={instituteId}
        dataToBeEdited={dataToBeEdited}
        dialogToggle={dialogToggle}
        setDialogToggle={setDialogToggle}
      />

      <DeleteDialog
        dialogTitle="Are you sure you want to delete this Exam?"
        dialogToggle={deleteDialogToggle}
        setDialogToggle={setDeleteDialogToggle}
        dialogHandler={handleDeleteQuiz}
      />
    </div>
  );
};

export default ExamListPage;

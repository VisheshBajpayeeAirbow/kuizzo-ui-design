"use client";
import CustomTable from "@/components/ui/Organisms/CustomTable";
import DeleteDialog from "@/components/ui/Organisms/dialogs/DeleteDialog";
import EditStudentDialog from "@/components/ui/Organisms/dialogs/EditStudentDialog";
import { useDeleteStudentByIdMutation } from "@/server/mutations";
import { useGetAllStudentsByInstituteId } from "@/server/queries";
import { IStudentDialogForm } from "@/types";
import { IStudentData } from "@/types/api";
import { studentTableColumns } from "@/mappings";
import React, { useState } from "react";
import Spinner from "@/components/ui/Atoms/Spinner";

const StudentListPage = ({ instituteId }: { instituteId: string }) => {
  // states
  const [dialogToggle, setDialogToggle] = useState<boolean>(false);
  const [deleteDialogToggle, setDeleteDialogToggle] = useState(false);
  const [dataToBeDeletedId, setDataToBeDeletedId] = useState();
  const [dataToBeEdited, setDataToBeEdited] = useState<IStudentDialogForm>();
  const [originalData, setOriginalData] = useState<IStudentData>();

  // query
  const {
    data: studentData,
    isLoading,
    isError,
    error,
  } = useGetAllStudentsByInstituteId(instituteId);

  //   mutations
  const deleteStudentMutation = useDeleteStudentByIdMutation();

  const handleEditStudent = (editData: IStudentData) => {
    console.log("EDIT DATA: ", editData);
    setDialogToggle((prevState) => !prevState);
    setDataToBeEdited({
      title: editData.title,
      username: editData.username,
      email: editData.email,
      createExam: editData.permissions.createExam,
      createQuiz: editData.permissions.createQuiz,
      instructorId: editData.instructorId,
      courseId: editData?.courseId,
    });
    setOriginalData(editData);
  };

  const handleDeleteStudent = () => {
    if (dataToBeDeletedId !== undefined) {
      deleteStudentMutation.mutateAsync(dataToBeDeletedId).catch((error) => {
        console.error("Error Deleting student", error);
        throw new Error("Error Deleting student " + error);
      });
    }
  };

  const handleOpenDeleteDialog = (deleteData: any) => {
    console.log("DELETE DATA: ", deleteData);
    setDeleteDialogToggle((prevState) => !prevState);
    setDataToBeDeletedId(deleteData.id);
  };

  if (isLoading) return <Spinner loadingText="Fetching Students" />;
  if (isError) return <div>ERROR OCCURED: {error.message}</div>;

  return (
    <div>
      <CustomTable
        tableColumns={studentTableColumns}
        tableData={studentData.students || []}
        pageSize={6}
        hasActions
        header="Students List"
        handleEdit={handleEditStudent}
        handleDelete={handleOpenDeleteDialog}
      />
      <EditStudentDialog
        instituteId={instituteId}
        originalData={originalData}
        dataToBeEdited={dataToBeEdited}
        dialogToggle={dialogToggle}
        setDialogToggle={setDialogToggle}
      />

      <DeleteDialog
        dialogTitle="Are you sure you want to delete this student?"
        dialogToggle={deleteDialogToggle}
        setDialogToggle={setDeleteDialogToggle}
        dialogHandler={handleDeleteStudent}
      />
    </div>
  );
};

export default StudentListPage;

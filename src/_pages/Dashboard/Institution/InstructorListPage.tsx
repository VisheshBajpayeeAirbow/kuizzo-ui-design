"use client";

import CustomTable from "@/components/ui/Organisms/CustomTable";
import DeleteDialog from "@/components/ui/Organisms/dialogs/DeleteDialog";
import EditInstructorDialog from "@/components/ui/Organisms/dialogs/EditInstructorDialog";
import { useDeleteInstructorByIdMutation } from "@/server/mutations";
import { useGetAllInstructorsByInstituteId } from "@/server/queries";
import { IInstructorDialogForm } from "@/types";
import { IInstructorData } from "@/types/api";
import React, { useState } from "react";
import { instructorTableColumns } from "@/mappings";
import Spinner from "@/components/ui/Atoms/Spinner";

const InstructorListPage = ({ instituteId }: { instituteId: string }) => {
  // states
  const [dialogToggle, setDialogToggle] = useState<boolean>(false);
  const [deleteDialogToggle, setDeleteDialogToggle] = useState(false);
  const [dataToBeDeletedId, setDataToBeDeletedId] = useState();
  const [dataToBeEdited, setDataToBeEdited] = useState<IInstructorDialogForm>();
  const [originalData, setOriginalData] = useState<IInstructorData>();

  // query
  const {
    data: instructorData,
    isLoading,
    isError,
    error,
  } = useGetAllInstructorsByInstituteId(instituteId);

  //   mutations
  const deleteInstructorMutation = useDeleteInstructorByIdMutation();

  const handleEditInstructor = (editData: IInstructorData) => {
    // editData is the row data of the selected row
    setDialogToggle((prevState) => !prevState);
    setDataToBeEdited({
      email: editData.email,
      title: editData.title,
      username: editData.username,
      addInstructor: editData.permissions.addInstructor,
      addStudents: editData.permissions.addStudents,
      billingAndPayments: editData.permissions.billingAndPayments,
      createCourse: editData.permissions.createCourse,
      createQuizAndExam: editData.permissions.createQuizAndExam,
      courseIds: editData?.courseIds,
    });
    setOriginalData(editData);
  };

  const handleDeleteInstructor = () => {
    if (dataToBeDeletedId !== undefined) {
      deleteInstructorMutation.mutateAsync(dataToBeDeletedId).catch((error) => {
        console.error("Error deleting instructor:", error);
        throw new Error("Error deleting instructor: " + error);
      });
    }
  };
  const handleOpenDeleteDialog = (deleteData: any) => {
    console.log("DELETE DATA: ", deleteData);
    setDeleteDialogToggle((prevState) => !prevState);
    setDataToBeDeletedId(deleteData.id);
  };

  if (isLoading) return <Spinner loadingText="Fetching Instructors" />;
  if (isError) return <div>ERROR OCCURED: {error.message}</div>;

  return (
    <div>
      <CustomTable
        tableData={instructorData || []}
        tableColumns={instructorTableColumns}
        hasActions
        pageSize={10}
        header="Instructor List"
        handleDelete={handleOpenDeleteDialog}
        handleEdit={handleEditInstructor}
      />
      {/* dialogs */}
      <EditInstructorDialog
        instituteId={instituteId}
        originalData={originalData}
        dataToBeEdited={dataToBeEdited}
        dialogToggle={dialogToggle}
        setDialogToggle={setDialogToggle}
      />
      <DeleteDialog
        dialogTitle="Are you sure you want to delete this instructor?"
        dialogToggle={deleteDialogToggle}
        setDialogToggle={setDeleteDialogToggle}
        dialogHandler={handleDeleteInstructor}
      />
    </div>
  );
};

export default InstructorListPage;

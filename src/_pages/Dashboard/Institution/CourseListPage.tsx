"use client";
import Spinner from "@/components/ui/Atoms/Spinner";
import ParentCardDashboard from "@/components/ui/Molecules/dashboard/cards/ParentCardDashboard";
import CustomTable from "@/components/ui/Organisms/CustomTable";
import DeleteDialog from "@/components/ui/Organisms/dialogs/DeleteDialog";
import { PATHS } from "@/constants";
import { coursesListColumnMapping } from "@/mappings";
import { useDeleteCourseByIdMutation } from "@/server/mutations";
import { useGetEnrichedCoursesByInstituteId } from "@/server/queries";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CourseListPage = ({ instituteId }: { instituteId: string }) => {
  const [deleteDialogToggle, setDeleteDialogToggle] = useState(false);
  const [dataToBeDeletedId, setDataToBeDeletedId] = useState<string>();

  const deleteCourseByIdMutation = useDeleteCourseByIdMutation();
  const router = useRouter();

  const {
    data: coursesData,
    isLoading,
    isError,
    error,
  } = useGetEnrichedCoursesByInstituteId(instituteId);

  const handleOpenDeleteDialog = (deleteData: any) => {
    setDeleteDialogToggle((prevState) => !prevState);
    setDataToBeDeletedId(deleteData.id);
  };

  const handleDeleteCourse = () => {
    if (dataToBeDeletedId !== undefined) {
      deleteCourseByIdMutation.mutate(dataToBeDeletedId);
    }
  };

  // TODO: need to add type to editData
  const handleEditCourse = (editData: any) => {
    toast.success("EDIT TRIGGERED");
    // TODO: add course id in search parameter in order for edit page to know what course to search for in order for it to be edited
    router.push(`${PATHS.editCourse}/?courseId=${editData.id}`);
  };

  // loading and error states
  if (isLoading) return <Spinner loadingText="Fetching Courses" />;
  if (isError) throw new Error(error.message);

  return (
    <div>
      <ParentCardDashboard heading="Course List" marginBottom="mb-[7rem]">
        <CustomTable
          header=""
          pageSize={5}
          hasActions
          handleDelete={handleOpenDeleteDialog}
          handleEdit={handleEditCourse}
          tableColumns={coursesListColumnMapping}
          tableData={coursesData?.courses || []}
        />

        <DeleteDialog
          dialogTitle="Are you sure you want to delete this course?"
          dialogToggle={deleteDialogToggle}
          setDialogToggle={setDeleteDialogToggle}
          dialogHandler={handleDeleteCourse}
        />
      </ParentCardDashboard>
    </div>
  );
};

export default CourseListPage;

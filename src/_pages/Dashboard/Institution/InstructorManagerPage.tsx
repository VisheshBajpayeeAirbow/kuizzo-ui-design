"use client";
import FormCardDashboard from "@/components/ui/Molecules/dashboard/cards/FormCardDashboard";
import ParentCardDashboard from "@/components/ui/Molecules/dashboard/cards/ParentCardDashboard";
import CreateIndividualInstructorForm from "@/components/ui/Organisms/forms/dashboard/institution/CreateIndividualInstructorForm";
import {
  IAddIndividualInstructorFormProps,
  IInstructorStudentClipboardData,
} from "@/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bulkInstructorUploadFormSchema } from "@/validations";
import toast from "react-hot-toast";
import { Button } from "@/components";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import ScrollToTop from "react-scroll-to-top";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/custom/tabs";
import { useEffect, useState } from "react";
import Papa, { ParseResult } from "papaparse";
import {
  useCreateInstructorCourseEnrollmentMutation,
  useCreateInstructorMutation,
  useCreateInstructorsInBulkMutation,
  useUploadFiles,
} from "@/server/mutations";
import { IInstructorData } from "@/types/api";
import { useSession } from "next-auth/react";
import { generateUniquePassword, generateUsername } from "@/utils";
import ShowCreatedDetailsDialog from "@/components/ui/Organisms/dialogs/ShowCreatedDetailsDialog";
import { getInstitutionById } from "@/server";

const InstructorManagerPage = ({ instituteId }: { instituteId: string }) => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bulkInstructorUploadFormSchema),
  });

  // states
  const [showDetailsDialogToggle, setShowDetailsDialogToggle] =
    useState<boolean>(false);
  const [resetFileInput, setResetFileInput] = useState(false);
  const [convertedBulkData, setConvertedBulkData] =
    useState<IInstructorStudentClipboardData[]>();

  // mutations
  const uploadFileMutation = useUploadFiles();
  const createInstructorMutation = useCreateInstructorMutation();
  const createEnrollmentMutation =
    useCreateInstructorCourseEnrollmentMutation();
  const createInstructorsInBulkMutation = useCreateInstructorsInBulkMutation();

  const handleCreateIndividualInstructor = async (
    individualInstructorData: IInstructorData,
    courseIds: string[]
  ) => {
    try {
      createInstructorMutation
        .mutateAsync(individualInstructorData)
        .then((instructorData) => {
          if (instructorData.status === 200) {
            createEnrollmentMutation.mutateAsync({
              courseIds,
              instructorId: instructorData.data.instructor.id,
            });
          }
        });
    } catch (error) {
      console.error("Error creating instructor or enrolling in course:", error);
    }
  };

  const onSubmit = async (data: { addInstructorCsv: any }) => {
    await getInstitutionById(session?.user.id).then((instituteData) => {
      if (data.addInstructorCsv.length > 0) {
        Papa.parse(data.addInstructorCsv[0], {
          header: true,
          complete: (
            result: ParseResult<IAddIndividualInstructorFormProps>
          ) => {
            const convertedData: IInstructorData[] = result.data
              .slice(0, -1)
              .map((instructor) => {
                const username = generateUsername(
                  instructor.instructorName,
                  instituteData.institute.pageContent.heroSection.instituteUrl
                );
                const password = generateUniquePassword(username);
                return {
                  permissions: instituteData.institute.instructorPermissions,
                  instituteId: instituteData.institute.id,
                  subscription: "free",
                  verified: false,
                  username: username,
                  password: password,
                  courseIds: instructor.course as string[],
                  email: instructor.email,
                  title: instructor.instructorName,
                };
              });
            console.log("CONVERTED DATA: ", convertedData);
            // ? api call for bulk upload instructors
            createInstructorsInBulkMutation.mutateAsync(convertedData, {
              onSuccess: () => {
                setConvertedBulkData(
                  convertedData.map((data) => ({
                    email: data.email,
                    password: data.password!,
                    title: data.title,
                    username: data.username,
                  }))
                );
                setShowDetailsDialogToggle((prevState) => !prevState);
              },
            });
          },

          error: (error) => {
            console.log("ERROR: ", error);
            toast.error(error.message);
          },
        });
        setResetFileInput(true);
      } else {
        toast.error("NO FILE SELECTED");
        return;
      }
    });

    reset();
  };

  useEffect(() => {
    if (resetFileInput) {
      setResetFileInput(false);
    }
  }, [resetFileInput]);

  return (
    <div>
      <ParentCardDashboard
        marginBottom="mb-[3rem]"
        heading="Instructor Manager"
      >
        <div className="pb-[2rem]">
          <Tabs defaultValue="bulk-upload">
            <TabsList className="flex justify-center tablet:justify-start mb-4 tablet:mb-0">
              <TabsTrigger value="bulk-upload">Bulk Upload</TabsTrigger>
              <TabsTrigger value="individual-upload">
                Individual Upload
              </TabsTrigger>
            </TabsList>
            <TabsContent value="bulk-upload">
              <FormCardDashboard
                headingTextSize="text-[1.875rem]"
                fullWidthOnMediumDevices
                heading="Add Bulk Instructors"
                marginAuto={false}
              >
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="pb-[4.06rem]"
                >
                  <FormInput
                    register={register}
                    name={"addInstructorCsv"}
                    inputType="file"
                    placeholder="Upload CSV"
                    fileInputTypeInfo="CSV files only"
                    labelText="Add Bulk Instructors"
                    fileUploadType={["text/csv"]}
                    resetFileUpload={reset}
                    fileInputResetTrigger={resetFileInput}
                    errorMessage={errors.addInstructorCsv?.message}
                  />

                  <div className="flex justify-center mt-[3rem]">
                    <Button
                      type="submit"
                      className="w-[12.8125rem]"
                      btnColor="purple"
                    >
                      Add Bulk Instructors{" "}
                    </Button>
                  </div>
                </form>
                {/* <pre>{JSON.stringify(convertedBulkData, null, 2)}</pre> */}
              </FormCardDashboard>
            </TabsContent>
            <TabsContent value="individual-upload">
              <FormCardDashboard
                headingTextSize="text-[1.875rem]"
                fullWidthOnMediumDevices
                heading="Add Individual Instructor"
                marginAuto={false}
              >
                <CreateIndividualInstructorForm
                  individualInstructorFormHandler={
                    handleCreateIndividualInstructor
                  }
                />
              </FormCardDashboard>
            </TabsContent>
          </Tabs>
        </div>
      </ParentCardDashboard>
      <div>
        <ShowCreatedDetailsDialog
          setDialogToggle={setShowDetailsDialogToggle}
          dialogToggle={showDetailsDialogToggle}
          dialogTitle="Generated Instructors' details. These details will not be visible again. Make sure to copy its content."
          dialogDescription={JSON.stringify(convertedBulkData, null, 2)}
        />
      </div>
      <ScrollToTop
        smooth
        style={{
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
        component={
          <IoArrowUpCircleOutline className="text-2xl text-app-purple hover:scale-[200%] transition ease-in-out duration-300 absolute right-0" />
        }
      />
    </div>
  );
};
export default InstructorManagerPage;

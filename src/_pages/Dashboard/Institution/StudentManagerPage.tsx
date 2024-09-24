"use client";

import FormCardDashboard from "@/components/ui/Molecules/dashboard/cards/FormCardDashboard";
import ParentCardDashboard from "@/components/ui/Molecules/dashboard/cards/ParentCardDashboard";
import CreateIndividualStudentForm from "@/components/ui/Organisms/forms/dashboard/institution/CreateIndividualStudentForm";

import {
  IAddIndividualStudentsFormProps,
  IInstructorStudentClipboardData,
} from "@/types";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components";
import { bulkStudentUploadFormSchema } from "@/validations";
import toast from "react-hot-toast";
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
  useCreateStudentCourseEnrollmentMutation,
  useCreateStudentMutation,
  useCreateStudentsInBulkMutation,
} from "@/server/mutations";
import { IStudentData } from "@/types/api";
import { getInstitutionById } from "@/server";
import { generateUniquePassword, generateUsername } from "@/utils";
import ShowCreatedDetailsDialog from "@/components/ui/Organisms/dialogs/ShowCreatedDetailsDialog";

const StudentManagerPage = ({ instituteId }: { instituteId: string }) => {
  // form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bulkStudentUploadFormSchema),
  });
  // states
  const [resetFileInput, setResetFileInput] = useState(false);
  const [parsedStudents, setParsedStudents] = useState<
    IAddIndividualStudentsFormProps[]
  >([]);

  const [convertedBulkData, setConvertedBulkData] =
    useState<IInstructorStudentClipboardData[]>();
  const [showDetailsDialogToggle, setShowDetailsDialogToggle] =
    useState<boolean>(false);

  // mutations
  const createStudentMutation = useCreateStudentMutation();
  const createEnrollmentMutation = useCreateStudentCourseEnrollmentMutation();
  const createStudentsInBulkMutation = useCreateStudentsInBulkMutation();

  const handleCreateIndividualStudent = async (
    individualStudentData: IStudentData,
    courseId: string
  ) => {
    try {
      createStudentMutation
        .mutateAsync(individualStudentData)
        .then((studentData) => {
          createEnrollmentMutation.mutateAsync({
            courseId,
            studentId: studentData.student.id,
          });
        });
    } catch (error) {
      console.error("Error creating student or enrolling in course:", error);
    }
  };

  const onSubmit = async (data: { addStudentCsv: any }) => {
    await getInstitutionById(instituteId).then((instituteData) => {
      if (data.addStudentCsv.length > 0) {
        Papa.parse(data.addStudentCsv[0], {
          header: true,
          complete: (result: ParseResult<IAddIndividualStudentsFormProps>) => {
            const convertedData: IStudentData[] = result.data
              .slice(0, -1)
              .map((student) => {
                const username = generateUsername(
                  student.studentName,
                  instituteData.institute.pageContent.heroSection.instituteUrl
                );
                const password = generateUniquePassword(username);
                return {
                  permissions: instituteData.institute.studentPermissions,
                  instituteId: instituteData.institute.id,
                  subscription: "free",
                  verified: false,
                  username,
                  password,
                  courseId: student.course,
                  email: student.email,
                  instructorId: student.instructor,
                  title: student.studentName,
                };
              });
            console.log("STUDENT CONVERTED DATA: ", convertedData);
            // ? api call for bulk upload students
            createStudentsInBulkMutation.mutateAsync(convertedData, {
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

  // effects
  useEffect(() => {
    if (resetFileInput) {
      setResetFileInput(false);
    }
  }, [resetFileInput]);

  return (
    <div>
      <ParentCardDashboard marginBottom="mb-[3rem]" heading="Student Manager">
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
                heading="Add Bulk Student"
                marginAuto={false}
              >
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="pb-[4.06rem]"
                >
                  <FormInput
                    register={register}
                    name={"addStudentCsv"}
                    inputType="file"
                    placeholder="Upload CSV"
                    fileInputTypeInfo="CSV files only"
                    labelText="Add Bulk Students"
                    fileUploadType={["text/csv"]}
                    resetFileUpload={reset}
                    fileInputResetTrigger={resetFileInput}
                    errorMessage={errors.addStudentCsv?.message?.toString()}
                  />
                  <div className="flex justify-center mt-[3rem]">
                    <Button
                      type="submit"
                      className="w-[12.8125rem]"
                      btnColor="purple"
                    >
                      Add Bulk Students
                    </Button>
                  </div>
                </form>
                {/* <pre>{JSON.stringify(parsedStudents, null, 2)}</pre> */}
              </FormCardDashboard>
            </TabsContent>
            <TabsContent value="individual-upload">
              <FormCardDashboard
                headingTextSize="text-[1.875rem]"
                fullWidthOnMediumDevices
                heading="Add Individual Student"
                marginAuto={false}
              >
                <CreateIndividualStudentForm
                  individualStudentFormHandler={handleCreateIndividualStudent}
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

export default StudentManagerPage;

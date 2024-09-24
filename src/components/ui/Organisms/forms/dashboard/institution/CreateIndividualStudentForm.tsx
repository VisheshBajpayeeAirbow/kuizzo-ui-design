import Button from "@/components/ui/Atoms/Button";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import Spinner from "@/components/ui/Atoms/Spinner";
import {
  useCachedInstitutionById,
  useGetAllInstructorsByInstituteId,
  useGetCoursesByInstituteId,
} from "@/server/queries";
import {
  IAddIndividualStudentsFormProps,
  ICreateIndividualStudentFormProps,
} from "@/types";
import { IStudentData } from "@/types/api";
import { generateUniquePassword, generateUsername } from "@/utils";
import { addIndividualStudentFormSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ShowCreatedDetailsDialog from "../../../dialogs/ShowCreatedDetailsDialog";
import { useS3Upload } from "@/hooks";

const CreateIndividualStudentForm = ({
  individualStudentFormHandler,
}: ICreateIndividualStudentFormProps) => {
  const { uploadFile } = useS3Upload();
  // states
  const [studentData, setStudentData] = useState<IStudentData>();
  const [showDetailsDialogToggle, setShowDetailsDialogToggle] = useState(false);
  // hooks
  const { data: session } = useSession();

  // queries
  const {
    data: courseData,
    isError: coursesError,
    isLoading: coursesLoading,
    error,
  } = useGetCoursesByInstituteId(session?.user.id);

  const { data: instructorData, isLoading: instructorsLoading } =
    useGetAllInstructorsByInstituteId(session?.user.id);
  const getInstituteByIdQuery = useCachedInstitutionById(session?.user.id);
  const coursesSelectOptions = courseData?.courses.map((course) => {
    return {
      id: course.id,
      value: course.courseName,
    };
  });

  const instructorSelectOptions =
    instructorData && instructorData?.length > 0
      ? instructorData?.map((instructor) => {
          return {
            id: instructor.id,
            value: instructor.title,
          };
        })
      : [{ id: "", value: "" }];
  // form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addIndividualStudentFormSchema) });

  const onSubmit = async (data: IAddIndividualStudentsFormProps) => {
    let uploadUrl;
    let key;
    if (data.image?.length !== 0 && data.image) {
      uploadUrl = await uploadFile(data.image[0], "student", "profile-images");
      key = uploadUrl.split("/").slice(3).join("/").split("?")[0];
    }

    const defaultPermissions =
      getInstituteByIdQuery.data &&
      getInstituteByIdQuery.data?.institute.studentPermissions;
    const username = generateUsername(
      data.studentName,
      getInstituteByIdQuery.data?.institute.pageContent.heroSection
        .instituteUrl as string
    );
    const uniquePassword = generateUniquePassword(username);
    const payload: IStudentData = {
      instituteId: session?.user.id,
      instructorId: data.instructor,
      courseId: data.course,
      email: data.email,
      password: uniquePassword,
      permissions: defaultPermissions!,
      username: username,
      profileImage:
        data.image?.length === 0
          ? {
              fileKey: "",
              fileName: "",
              fileType: "",
            }
          : {
              fileKey: key,
              fileName: data?.image && data?.image[0].name,
              fileType: data?.image && data?.image[0].type,
            },
      subscription: "free",
      title: data.studentName,
      verified: false,
    };
    setStudentData(payload);
    setShowDetailsDialogToggle((prevState) => !prevState);
    individualStudentFormHandler(payload, data.course);
    console.log("STUDENT DATA PAYLOAD: ", payload);
    reset();
  };

  // loading state
  if (coursesLoading || instructorsLoading || getInstituteByIdQuery.isLoading)
    return <Spinner />;
  // error state
  if (coursesError) return <p>ERROR OCCURED: {error.message}</p>;

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[3.31rem]"
      >
        <FormInput
          register={register}
          labelText="Student Name"
          name="studentName"
          placeholder="Name"
          errorMessage={errors?.studentName?.message}
        />

        <FormInput
          register={register}
          labelText="Email"
          name="email"
          placeholder="Email"
          errorMessage={errors?.email?.message}
        />
        <FormInput
          register={register}
          labelText="Course"
          name="course"
          placeholder="course"
          inputType="select"
          selectOptions={coursesSelectOptions}
          errorMessage={errors?.course?.message}
        />
        <FormInput
          register={register}
          labelText="Instructor"
          name="instructor"
          placeholder="Select Instructor"
          inputType="select"
          selectOptions={instructorSelectOptions}
          errorMessage={errors?.instructor?.message}
        />

        <div className="flex flex-col md:flex-row justify-between items-center gap-[5rem] md:gap-[24.06rem] pb-[4.94rem]">
          <FormInput
            labelText="Add Image (optional)"
            name="image"
            register={register}
            inputType="file"
            placeholder="Add Image"
            fileUploadType={["image/png", "image/jpeg", "image/jpg"]}
          />
          <Button className="w-[12.8125rem]" btnColor="purple" type="submit">
            Add Student
          </Button>
        </div>
      </form>

      <ShowCreatedDetailsDialog
        setDialogToggle={setShowDetailsDialogToggle}
        dialogToggle={showDetailsDialogToggle}
        dialogTitle="Generated Student's details. These details will not be visible again. Make sure to copy its content."
        dialogDescription={JSON.stringify(studentData, null, 2)}
      />
    </>
  );
};

export default CreateIndividualStudentForm;

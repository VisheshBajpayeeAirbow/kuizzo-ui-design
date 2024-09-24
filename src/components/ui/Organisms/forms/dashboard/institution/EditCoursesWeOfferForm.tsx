import { useEffect } from "react";
import Button from "@/components/ui/Atoms/Button";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import { useForm, useFieldArray } from "react-hook-form";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import { useGetCoursesByInstituteId } from "@/server/queries";
import { useSession } from "next-auth/react";

export interface IEditCoursesWeOfferForm {
  courses: { courseName: string }[];
}

export interface IEditCoursesWeOfferFromProps {
  submitHandler: (data: {
    courses: { courseId: string | undefined }[];
  }) => void;
  defaultValues: IEditCoursesWeOfferForm;
}

const EditCoursesWeOfferForm = ({
  submitHandler,
  defaultValues,
}: IEditCoursesWeOfferFromProps) => {
  const { data: session } = useSession();
  const {
    data: coursesData,
    isLoading,
    isError,
    error,
  } = useGetCoursesByInstituteId(session?.user.id);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IEditCoursesWeOfferForm>({
    defaultValues: defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "courses",
  });

  const onSubmit = (data: IEditCoursesWeOfferForm) => {
    const courseIds = data.courses.map((course) => {
      const matchedCourse = coursesData?.courses.find(
        (c) => c.courseName === course.courseName
      );
      return {
        courseId: matchedCourse ? matchedCourse.id : "",
      };
    });

    console.log("COURSE IDs: ", courseIds);
    submitHandler({ courses: courseIds });
  };

  const watchAllFields = watch("courses");
  useEffect(() => {
    console.log("ALL COURSES FIELDS: ", watchAllFields);
  }, [watchAllFields]);

  if (isLoading) {
    return <p>Loading Courses....</p>;
  }

  if (isError) throw new Error(error.message);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 tablet:grid-cols-3 gap-[2.75rem]">
          {fields.map((item, index) => (
            <div className="flex" key={item.id}>
              <FormInput
                register={register}
                labelText={`Course ${index + 1}`}
                placeholder="Select Course"
                inputType="select"
                name={`courses.${index}.courseName`}
                selectOptions={coursesData?.courses.map(
                  (course) => course.courseName
                )}
              />
              {index > 0 && (
                <IoIosRemoveCircleOutline
                  className="text-rose-500 hover:rotate-180 hover:scale-150 transition ease-in-out duration-800 cursor-pointer"
                  onClick={() => remove(index)}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <div className="flex justify-center cursor-pointer">
            {coursesData && fields.length < coursesData?.courses.length && (
              <IoIosAddCircleOutline
                className="w-[1.4695rem] h-[1.4695rem] text-app-purple hover:rotate-180 hover:scale-150 transition ease-in-out duration-800"
                onClick={() => {
                  if (fields.length < 12) {
                    append({ courseName: "" });
                  }
                }}
              />
            )}
          </div>
          <div className="flex justify-center gap-4 pb-6">
            <Button type="submit" btnColor="purple" className="w-48 mt-4">
              Add Courses
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditCoursesWeOfferForm;

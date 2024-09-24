import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import Button from "@/components/ui/Atoms/Button";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import {
  resetCreateCourseForms,
  setActiveStep,
  setCreateTopicForm,
  setTopicsExist,
} from "@/features/courseSlice/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { courseTopicFormSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { RootState } from "@/store/store";
import {
  useCreateCourseMutation,
  useUpdateCourseByIdMutation,
} from "@/server/mutations";
import { transformCourseState } from "@/utils";
import { useSession } from "next-auth/react";
import { ISubject } from "@/types/api";
import toast from "react-hot-toast";
import { useS3Upload } from "@/hooks";
import { IFileUpload } from "@/types";

export interface ICourseTopicFormProps {
  mode: "create" | "edit";
  courseId?: string;
}

export interface ICourseTopicForm {
  topics: {
    topicName: string;
    topicDescription: string;
    selectedSubject: string;
  }[];
}

const CourseTopicForm = ({ mode, courseId }: ICourseTopicFormProps) => {
  const { uploadFile, getFileUrlByKey } = useS3Upload();
  const { data: session } = useSession();
  const createCourseMutation = useCreateCourseMutation();
  const updateCourseMutation = useUpdateCourseByIdMutation();
  const defaultCourseTopicForm = useSelector(
    (state: RootState) => state.course.createTopicForm
  );

  const createdSubjectsNames = useSelector((state: RootState) =>
    state.course.createSubjectForm.subjects.map(
      (subject: ISubject) => subject.subjectName
    )
  );

  const courseObject = useSelector((state: RootState) => state.course);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICourseTopicForm>({
    resolver: yupResolver(courseTopicFormSchema),
    defaultValues: defaultCourseTopicForm,
  });

  const dispatch = useDispatch();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "topics",
  });

  const onSubmit: SubmitHandler<ICourseTopicForm> = (data) => {
    console.log(data);
    dispatch(setCreateTopicForm(data));
    dispatch(setActiveStep("module"));
    dispatch(setTopicsExist(true));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    toast.success(
      `Topics ${mode === "edit" ? "Updated" : "Created"} successfully`
    );
  };

  // will only trigger if wantTopics is false
  const handlePublish = async () => {
    try {
      const instituteId = session?.user?.id;
      const data = await transformCourseState(courseObject, instituteId);

      let uploadUrl = "";
      if (data.courseMaterial) {
        console.log("DATA: ", data.courseMaterial);
        uploadUrl = await uploadFile(
          data.courseMaterial,
          "institution",
          "course-materials"
        );

        const key = uploadUrl.split("/").slice(3).join("/").split("?")[0];
        data.courseMaterialKey = key; // Optionally store the key in the data object if needed
      }
      console.log("TRANSFORMED COURSE PAYLOAD: ", data);

      if (mode === "edit" && courseId) {
        updateCourseMutation.mutate({ id: courseId, data });
      } else {
        createCourseMutation.mutate(data);
      }
    } catch (error) {
      console.error("Error publishing course: ", error);
    }
  };

  return (
    <>
      <form className="mt-[3rem] space-y-10" onSubmit={handleSubmit(onSubmit)}>
        <p className="font-caladea text-lg text-center">
          This step is optional, If you dont need topics, Click on publish to
          create a course
        </p>
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col gap-[2rem] relative border border-input-border rounded-[1.25rem] p-6"
          >
            <FormInput
              labelText={`Select Subject for Topic ${index + 1}`}
              name={`topics[${index}].selectedSubject`}
              placeholder="Select Subject"
              register={register}
              errorMessage={errors?.topics?.[index]?.selectedSubject?.message}
              inputType="select"
              selectOptions={createdSubjectsNames}
            />

            <FormInput
              register={register}
              labelText={`Topic Name ${index + 1}`}
              placeholder="Enter Topic Name"
              inputType="default"
              name={`topics[${index}].topicName`}
              errorMessage={errors?.topics?.[index]?.topicName?.message}
            />
            <FormInput
              register={register}
              labelText={`Topic Description ${index + 1}`}
              placeholder="Enter Topic Description"
              inputType="textarea"
              name={`topics[${index}].topicDescription`}
              errorMessage={errors?.topics?.[index]?.topicDescription?.message}
            />

            {index > 0 && (
              <IoIosRemoveCircleOutline
                className="absolute w-[1.4695rem] h-[1.4695rem] right-5 top-5 text-red-500 cursor-pointer hover:rotate-180 hover:scale-150 transition ease-in-out duration-800"
                onClick={() => remove(index)}
              />
            )}
          </div>
        ))}
        <div className="flex justify-center cursor-pointer">
          <IoIosAddCircleOutline
            className="w-[1.4695rem] h-[1.4695rem] text-app-purple hover:rotate-180 hover:scale-150 transition ease-in-out duration-800"
            onClick={() =>
              append({
                topicName: "",
                topicDescription: "",
                selectedSubject: "",
              })
            }
          />
        </div>

        <div className="flex justify-center gap-4 pb-6">
          <Button
            onClick={() => {
              dispatch(setActiveStep("subject"));
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            type="button"
            btnColor="purple"
            className="w-48 mt-4"
          >
            Previous
          </Button>
          <Button type="submit" btnColor="purple" className="w-48 mt-4">
            {mode === "edit" ? "Update Topic" : "Create Topic"}
          </Button>
        </div>
      </form>

      <div className="flex justify-center gap-4 pb-6 mt-4">
        <Button
          type="button"
          btnColor="green"
          className="w-48 mt-4"
          onClick={handlePublish}
        >
          Publish
        </Button>
      </div>
    </>
  );
};

export default CourseTopicForm;

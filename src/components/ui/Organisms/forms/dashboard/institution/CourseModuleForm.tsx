import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { courseModuleFormSchema } from "@/validations";
import Button from "@/components/ui/Atoms/Button";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import {
  resetCreateCourseForms,
  setActiveStep,
  setCreateModuleForm,
} from "@/features/courseSlice/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { transformCourseState } from "@/utils";
import {
  useCreateCourseMutation,
  useUpdateCourseByIdMutation,
} from "@/server/mutations";
import { ITopic } from "@/types/api";
import toast from "react-hot-toast";
import { useS3Upload } from "@/hooks";

export interface ICourseModuleFormProps {
  mode: "create" | "edit";
  courseId?: string;
}

export interface ICourseModuleForm {
  modules: {
    moduleName: string;
    moduleDescription: string;
    selectedTopic: string;
  }[];
}

const CourseModuleForm = ({ mode, courseId }: ICourseModuleFormProps) => {
  const { uploadFile, getFileUrlByKey } = useS3Upload();
  const { data: session } = useSession();
  const createCourseMutation = useCreateCourseMutation();
  const updateCourseMutation = useUpdateCourseByIdMutation();
  const defaultCoutseModuleForm = useSelector(
    (state: RootState) => state.course.createModuleForm
  );
  const createdTopics = useSelector(
    (state: RootState) => state.course.createTopicForm.topics
  );

  const courseObject = useSelector((state: RootState) => state.course);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICourseModuleForm>({
    resolver: yupResolver(courseModuleFormSchema),
    defaultValues: mode === "edit" ? defaultCoutseModuleForm : undefined,
  });

  const dispatch = useDispatch();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "modules",
  });

  const handlePublish = async () => {
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
      data.courseMaterialKey = key;
    }
    console.log("TRANSFORMED COURSE PAYLOAD: ", data);
    if (mode === "edit" && courseId) {
      updateCourseMutation.mutate({ id: courseId, data });
    } else {
      createCourseMutation.mutate(data);
    }
  };

  const onSubmit: SubmitHandler<ICourseModuleForm> = (data) => {
    console.log(data);
    dispatch(setCreateModuleForm(data));
    toast.success(
      `Modules ${mode === "edit" ? "Updated" : "Created"} successfully`
    );
  };

  return (
    <>
      <div>
        <p className="font-caladea text-lg text-center">
          This step is optional, If you dont need modules, Click on publish to
          create a course
        </p>
        <form
          className="mt-[3rem] space-y-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="flex flex-col gap-[2rem] relative border border-input-border rounded-[1.25rem] p-6"
            >
              <FormInput
                labelText={`Select Topic ${index + 1}`}
                name={`modules[${index}].selectedTopic`}
                placeholder="Select Topic"
                register={register}
                errorMessage={errors?.modules?.[index]?.selectedTopic?.message}
                inputType="select"
                selectOptions={createdTopics.map(
                  (topic: ITopic) => topic.topicName
                )}
              />
              <FormInput
                register={register}
                labelText={`Module Name ${index + 1}`}
                placeholder="Enter Module Name"
                inputType="default"
                name={`modules[${index}].moduleName`}
                errorMessage={errors?.modules?.[index]?.moduleName?.message}
              />
              <FormInput
                register={register}
                labelText={`Module Description ${index + 1}`}
                placeholder="Enter Module Description"
                inputType="textarea"
                name={`modules[${index}].moduleDescription`}
                errorMessage={
                  errors?.modules?.[index]?.moduleDescription?.message
                }
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
                  moduleName: "",
                  moduleDescription: "",
                  selectedTopic: "",
                })
              }
            />
          </div>

          <div className="flex justify-center gap-4 pb-6">
            <Button
              onClick={() => {
                dispatch(setActiveStep("topic"));
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
              {mode === "edit" ? "Update Module" : "Create Module"}
            </Button>
          </div>
        </form>
        <div className="flex justify-center">
          <Button onClick={handlePublish} className="w-48 mt-4">
            Publish Course
          </Button>
        </div>
      </div>
    </>
  );
};

export default CourseModuleForm;

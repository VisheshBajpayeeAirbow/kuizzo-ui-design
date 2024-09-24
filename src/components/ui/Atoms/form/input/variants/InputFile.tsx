import { IFormInputProps } from "@/types";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { MdFileUpload, MdRemoveCircleOutline } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { IoCheckmark } from "react-icons/io5";

const InputFile = (props: IFormInputProps) => {
  const {
    register,
    name,
    errorMessage,
    labelText,
    fileInputTypeInfo,
    fileUploadType,
    resetFileUpload,
    fileInputResetTrigger,
    imageUrl: initialFileUrl, // New prop for the initial file URL
  } = props;

  const [fileUrl, setFileUrl] = useState<string | null>(initialFileUrl || null);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Check if the file size exceeds 10MB
      if (file.size > 10 * 1024 * 1024) {
        setFileError("File size should not exceed 10MB");
        toast.error("File size cannot be more than 10 mb");
        return;
      }

      // Use optional chaining and default value to avoid undefined
      const fileType = file.type ?? "";

      if (!fileUploadType?.includes(fileType)) {
        toast.error("File type is not supported");
        setFileError("File type is not supported");
        return;
      }

      // Check if the file type starts with 'image/'
      if (fileType.startsWith("image/")) {
        setFileUrl(URL.createObjectURL(file));
      }
      setUploadedFile(file.name);
      setFileError(null); // Clear any previous file size error
    }
  };

  const handleReset = () => {
    setFileUrl(null); // Reset URL to null
    setUploadedFile(null); // Clear the uploaded file name
    setFileError(null); // Clear any file error
    resetFileUpload && resetFileUpload({ [name]: "" }); // Call reset function
  };

  useEffect(() => {
    if (fileInputResetTrigger) {
      handleReset();
    }
  }, [fileInputResetTrigger]);

  return (
    <div className="w-full">
      <h6 className="text-[0.875rem] tracking-[0.04375rem] font-bold leading-normal mb-[1.87rem] text-input-label">
        {labelText}
      </h6>
      <AnimatePresence>
        {!fileUrl ? (
          <label
            htmlFor={name}
            className={`bg-dashboard-input-background ${
              errorMessage ? "border-rose-500" : "border-input-background"
            } rounded-[0.625rem]  w-full h-[8.6875rem] p-[0.625rem] flex items-center gap-[0.625rem] flex-shrink-0 justify-center cursor-pointer border-2 border-dashed `}
          >
            {uploadedFile ? (
              <motion.div
                className="flex flex-col items-center justify-center gap-[0.38rem]"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <IoCheckmark className="text-4xl text-[#C2C2FF]" />
                File uploaded
              </motion.div>
            ) : (
              <div className="flex flex-col items-center gap-[0.38rem]">
                <MdFileUpload className="w-[2.66544rem] h-[2.625rem] text-[#C2C2FF] " />
                <span className="font-caladea text-[#C2C2FF] text-[1.125rem] font-bold">
                  Upload file
                </span>
                <input
                  {...register(name)}
                  onChange={(e) => {
                    handleChange(e);
                    if (
                      e.target.files &&
                      fileUploadType?.includes(e.target.files[0].type ?? "")
                    ) {
                      register(name).onChange(e);
                    }
                  }}
                  type="file"
                  id={name}
                  className="hidden"
                />
                <p
                  className={`text-[0.625rem] leading-[150%] text-input-label ${
                    errorMessage || fileError ? "text-rose-500" : ""
                  }`}
                >
                  {errorMessage
                    ? errorMessage
                    : fileError
                    ? fileError
                    : fileInputTypeInfo
                    ? fileInputTypeInfo
                    : "PNG, JPG files are allowed"}
                </p>
              </div>
            )}
          </label>
        ) : (
          <motion.div
            className="relative w-full h-[8.6875rem] p-[0.625rem] flex items-center gap-[0.625rem] flex-shrink-0 justify-center border-[2px] border-app-purple rounded-[0.625rem]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              className="rounded-[0.625rem]"
              layout="fill"
              objectFit="cover"
              src={fileUrl}
              alt="Uploaded preview"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {(fileUrl || uploadedFile) && (
          <motion.div
            className="flex gap-[1.16rem] justify-between items-center py-2 px-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
          >
            <p className="flex items-center text-[0.875rem] text-app-green text-nowrap">
              {uploadedFile
                ? `Uploaded File: ${uploadedFile}`
                : "File uploaded"}
            </p>
            <MdRemoveCircleOutline
              onClick={(e) => {
                e.stopPropagation();
                handleReset();
              }}
              className="text-red-500 cursor-pointer hover:rotate-180 hover:scale-150 transition ease-in-out duration-800"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InputFile;

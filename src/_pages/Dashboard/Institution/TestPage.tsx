"use client";
import React, { useState } from "react";
import { Button } from "@/components";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import { useS3Upload } from "@/hooks"; // Adjust the import path accordingly
import { useForm } from "react-hook-form";
import Image from "next/image";

const TestPage = () => {
  const { register, handleSubmit } = useForm();
  const { uploadFile, getFileUrlByKey } = useS3Upload();
  const [fileUrl, setFileUrl] = useState<string>();

  const onSubmit = async (data: any) => {
    const file = data.testImage[0];

    try {
      const uploadUrl = await uploadFile(file, "institution", "test-dir");
      console.log("UPLOAD URL:", uploadUrl);

      // Get the key from the upload URL (optional)
      const key = uploadUrl.split("/").slice(3).join("/").split("?")[0]; // Extract the key from the URL

      // Get the file URL using the key
      const fileUrl = getFileUrlByKey(key);
      setFileUrl(fileUrl);
      console.log("File accessible at:", fileUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          inputType="file"
          name="testImage"
          placeholder="test"
          register={register}
          fileUploadType={["image/png", "image/jpeg", "image/jpg"]}
        />

        <Button>Submit Image</Button>
      </form>

      <div className="py-20">
        <Image src={fileUrl as string} alt="test" width={300} height={300} />
      </div>
    </>
  );
};

export default TestPage;

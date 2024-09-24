"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import axios from "axios";
import { BASE_URL, createdSignedUrl } from "@/server";
export const useDashboardInputBackground = () => {
  const pathname = usePathname();
  const dashboardExists = pathname.includes("dashboard");
  const inputBackground = dashboardExists
    ? "bg-dashboard-input-background"
    : "bg-input-background";
  return {
    inputBackground,
  };
};

export const useGetUserIdFromSession = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  return { userId };
};

export const useS3Upload = () => {
  const { data: session } = useSession();

  const getSignedUrl = async (
    file: File,
    role: "instructor" | "student" | "institution",
    directory: string
  ) => {
    // Define the file path with optional subdirectory
    const filePath = directory ? `${directory}/${file.name}` : file.name;

    const body = {
      tenant: session?.user?.id,
      role: role,
      fileName: filePath,
      contentType: file.type,
    };

    const response = await createdSignedUrl(body);
    return response.uploadUrl;
  };

  const uploadFile = async (
    file: File,
    role: "instructor" | "student" | "institution",
    directory: string = ""
  ) => {
    console.log("FILE: ", file);
    const uploadUrl = await getSignedUrl(file, role, directory);
    await axios.put(uploadUrl, file);
    console.log(`Uploaded to: ${uploadUrl}`);
    return uploadUrl;
  };

  // const uploadFilesInBulk = async (
  //   files: { file: File; role: "instructor" | "student" | "institution",  directory?: string }[]
  // ) => {
  //   const uploadResults = await Promise.all(
  //     files.map(({ file, directory }) => uploadFile(file, directory || ""))
  //   );
  //   return uploadResults;
  // };

  const getFileUrlByKey = (key: string) => {
    return `https://kuizzo-bucket.s3.us-west-2.amazonaws.com/${key}`;
  };

  return { uploadFile, getFileUrlByKey };
};

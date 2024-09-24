import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  ListObjectsCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

const Bucket = process.env.KUIZZO_AWS_BUCKET;
const s3 = new S3Client({
  region: process.env.KUIZZO_AWS_REGION,
  credentials: {
    accessKeyId: process.env.KUIZZO_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.KUIZZO_AWS_SECRET_ACCESS_KEY as string,
    sessionToken: process.env.KUIZZO_AWS_SESSION_TOKEN,
  },
});

export async function GET() {
  try {
    const response = await s3.send(new ListObjectsCommand({ Bucket }));
    return NextResponse.json(response?.Contents ?? []);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to list files" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(options);
  const tenantId = session?.user?.id;
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);

    // Example: Get a search parameter called "role"
    const queryParamRole = searchParams.get("subDirectory");
    console.log("Search Param - role:", queryParamRole);

    // Parse form data from the request
    const formData = await request.formData();
    const folder = formData.get("folder") as string;
    const files = formData.getAll("file") as File[];

    const responses = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const Body = Buffer.from(arrayBuffer);

        // Incorporate tenant and role in the S3 Key
        const params = {
          Bucket,
          Key: `${tenantId}/${queryParamRole}/${folder}/${file.name}`, // Key structure now follows the policy
          Body,
          ContentType: file.type,
        };

        const command = new PutObjectCommand(params);
        await s3.send(command);

        // Construct the URL for the uploaded file
        const fileUrl = `https://${Bucket}.s3.${process.env.KUIZZO_AWS_REGION}.amazonaws.com/${params.Key}`;
        return { fileName: file.name, fileUrl };
      })
    );

    return NextResponse.json({
      message: "Files uploaded successfully",
      files: responses,
    });
  } catch (error: any) {
    console.error("Upload error: ", error);
    return NextResponse.json(
      { error: `Failed to upload files: ${error.message}` },
      { status: 500 }
    );
  }
}

// app/api/documents/[key]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";

const Bucket = process.env.KUIZZO_AWS_BUCKET;
const s3 = new S3Client({
  region: process.env.KUIZZO_AWS_REGION,
  credentials: {
    accessKeyId: process.env.KUIZZO_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.KUIZZO_AWS_SECRET_ACCESS_KEY as string,
  },
});

export async function GET(
  _: NextRequest,
  { params }: { params: { key: string } }
) {
  const session = await getServerSession(options);
  const tenantId = session?.user?.id;
  const role = session?.user?.role;
  try {
    // The file key will follow the same pattern as when it was uploaded: tenant/role/folder/file
    const Key = `${tenantId}/${role}/${params.key}`;

    // Create the command to get the object
    const command = new GetObjectCommand({ Bucket, Key });

    // Generate a signed URL to get the object with an expiration of 1 hour (3600 seconds)
    const src = await getSignedUrl(s3, command, { expiresIn: 3600 });

    // Return the signed URL in the response
    return NextResponse.json({ src });
  } catch (error: any) {
    console.error("Error retrieving file: ", error);
    return NextResponse.json(
      { error: `Failed to retrieve file: ${error.message}` },
      { status: 500 }
    );
  }
}

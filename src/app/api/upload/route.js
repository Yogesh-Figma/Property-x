import { NextRequest, NextResponse } from "next/server";

import {
  S3Client,
  ListObjectsCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";


const Bucket = process.env.AMPLIFY_BUCKET;
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// endpoint to get the list of files in the bucket
export async function GET() {
  const response = await s3.send(new ListObjectsCommand({ Bucket }));
  return NextResponse.json(response?.Contents ?? []);
}

// endpoint to upload a file to the bucket
export async function POST(request) {
  const uploadedFileUrls = [];
  const fileUrlFormat = `https://${Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`  
  const formData = await request.formData();
  const userId = formData.get("userId");
  if(!userId) {
    return NextResponse.error("Missing credentials");
  }
  const files = formData.getAll("files");
  const basePath = "userUpload/" + (userId + "").split("").reverse().join("") + "/";
  await Promise.all(
    files.map(async (file) => {
      const Body = (await file.arrayBuffer());
      let filePath = basePath + file.name;
      s3.send(new PutObjectCommand({ Bucket, Key: basePath + file.name, Body }));
      uploadedFileUrls.push(fileUrlFormat + filePath);
    })
  );

  return NextResponse.json(uploadedFileUrls);
}
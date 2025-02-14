import { Client, Storage } from "node-appwrite";

const client = new Client();

client
	.setEndpoint(process.env.APPWRITE_ENDPOINT!)
	.setProject(process.env.APPWRITE_PROJECT_ID!)
	.setKey(process.env.APPWRITE_API_KEY!);

const storage = new Storage(client);

// export { storage };

export const updateFile = async (fileId: string) => {
	const response = await storage.updateFile(
		process.env.APPWRITE_BUCKET_ID!,
		fileId
	);
	return response.$id;
};

export const uploadFileToAppwrite = async (file: File) => {
	const response = await storage.createFile(
		process.env.APPWRITE_BUCKET_ID!,
		"unique()",
		file
	);
	return response.$id;
};
export const getFileFromAppwrite = async (fileId: string) => {
	const response = await storage.getFileDownload(
		process.env.APPWRITE_BUCKET_ID!,
		fileId
	);
	const blob = new Blob([response], { type: "application/octet-stream" });
	return blob;
};
export const getFileUrl = (fileId: string) => {
	return `https://cloud.appwrite.io/v1/storage/buckets/${process.env
		.APPWRITE_BUCKET_ID!}/files/${fileId}/view?project=${process.env
		.APPWRITE_PROJECT_ID!}`;
};

export const deleteFileFromAppwrite = async (fileId: string) => {
	await storage.deleteFile(process.env.APPWRITE_BUCKET_ID!, fileId);
};

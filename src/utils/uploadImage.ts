import path from "path";
import fs from "fs/promises";
import config from "../config/config";
import { uploadFile, deleteFile } from "../services/storageServices/minioServices";

export const handleImage = async (
    image?: Express.Multer.File,
    prefix?: string,
    oldImageUrl?: string,
    deleteOnly = false
): Promise<string | null> => {

    if (oldImageUrl) {
        const baseUrl = `${config.minioPublicUrl || "http://localhost:9000"}/${config.minioBucketName}/`;
        const oldObjectPath = oldImageUrl.replace(baseUrl, "");

        await deleteFile(config.minioBucketName, oldObjectPath);
        console.log(`🗑️ Deleted old image: ${oldObjectPath}`);
    }

    if (deleteOnly) {
        return null;
    }

    if (image) {
        const objectName = `${prefix ? `${prefix}/` : ""}${Date.now()}-${image.originalname}`;
        const filePath = path.resolve(image.path);

        await uploadFile(config.minioBucketName, filePath, objectName);
        await fs.unlink(filePath);

        const imageUrl = `${config.minioPublicUrl || "http://localhost:9000"}/${config.minioBucketName}/${objectName}`;

        console.log(`Uploaded new image: ${imageUrl}`);
        return imageUrl;
    }

    return null;
};

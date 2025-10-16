import { Client } from "minio";
import config from "../../config/config";

const minioClient = new Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: config.minioAccessKey,
    secretKey: config.minioSecretKey
});

(async () => {
  const exists = await minioClient.bucketExists(config.minioBucketName).catch(() => false);
  if (!exists) {
    await minioClient.makeBucket(config.minioBucketName, "ap-southeast-1");
    console.log(`Bucket '${config.minioBucketName}' created`);
  }
})();

const uploadFile = async (
  bucketName: string,
  filePath: string,
  objectName: string
) => {
  try {
    console.log(`Uploading ${filePath} to bucket ${bucketName}`);
    await minioClient.fPutObject(bucketName, objectName, filePath);
    console.log(`File ${objectName} uploaded successfully`);
  } catch (err) {
    console.error("Error uploading file: ", err);
    throw err; // agar bisa ditangani di controller
  }
};


const deleteFile = async (bucketName: string, objectName: string) => {
    try {
        await minioClient.removeObject(bucketName, objectName);
        console.log(`File ${objectName} deleted successfully`);
    } catch (err) {
        console.log("Error deleting file: ", err);
    }
};

export {
    uploadFile,
    deleteFile
}
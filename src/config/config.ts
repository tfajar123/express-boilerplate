import dotenv from 'dotenv';

dotenv.config()

interface Config {
    port: number,
    nodeEnv: string,
    minioBucketName: string,
    minioAccessKey: string,
    minioSecretKey: string,
    minioPublicUrl: string,
    nodemailerHost: string,
    nodemailerUser: string,
    nodemailerPassword: string
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    minioBucketName: process.env.MINIO_BUCKET_NAME || '',
    minioAccessKey: process.env.MINIO_ACCESS_KEY || '',
    minioSecretKey: process.env.MINIO_SECRET_KEY || '',
    minioPublicUrl: process.env.MINIO_PUBLIC_URL || '',
    nodemailerHost: process.env.NODEMAILER_HOST || '',
    nodemailerUser: process.env.NODEMAILER_USER || '',
    nodemailerPassword: process.env.NODEMAILER_PASSWORD || '',
    
}

export default config
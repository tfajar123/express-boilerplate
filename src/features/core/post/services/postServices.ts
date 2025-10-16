import path from "path"
import { prismaClient } from "../../../../config/prisma"
import { deleteFile, uploadFile } from "../../../../services/storageServices/minioServices"
import config from "../../../../config/config"
import fs from "fs/promises";
import omitPassword from "../../../../utils/omitPassword";

export const getAllPostService = async () => {
    const posts =  await prismaClient.post.findMany({
        include: { author: true },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return posts.map(p => ({ ...p, author: omitPassword(p.author)}))
}

export const getPostByIdService = async (id: number) => {
    const post = await prismaClient.post.findUnique({
        where: {
            id
        },
        include: { author: true }
    })

    if (!post) {
        return null;
    }

    return [post].map(p => ({ ...p, author: omitPassword(p.author)}))
}

export const createPostService = async ({
    title, content, authorId, image,
}: {
    title: string;
    content: string;
    authorId: number;
    image?: Express.Multer.File;
}) => {
    let imageUrl = '';
    if(image) {
        const objectName = `${Date.now()}-${image.originalname}`;
        const filePath = path.resolve(image.path)
        await uploadFile(config.minioBucketName, filePath, objectName)
        await fs.unlink(filePath)

        imageUrl = `${config.minioPublicUrl || 'http://localhost:9000'}/${config.minioBucketName}/${objectName}`
    }

    return await prismaClient.post.create({
        data: {
            title,
            content,
            image: imageUrl,
            authorId
        }
    })
}

export const updatePostService = async (
    id: number, 
    data: { 
        title?: string; 
        content?: string; 
        image?: Express.Multer.File 
    }
) => {
    const post = await prismaClient.post.findUnique({ where: { id } })
    if(!post) {
        return null
    }

    let imageUrl = post.image

    if (data.image) {
        const objectName = `${Date.now()}-${data.image.originalname}`;
        const filePath = path.resolve(data.image.path)
        await uploadFile(config.minioBucketName, filePath, objectName)
        await fs.unlink(filePath)

        if(post.image) {
            const oldObject = post.image.split('/').pop()
            if (oldObject) await deleteFile(config.minioBucketName, oldObject)
        }
        
        imageUrl = `${config.minioPublicUrl || 'http://localhost:9000'}/${config.minioBucketName}/${objectName}`
    }

    return await prismaClient.post.update({
        where: { id },
        data: {
            title: data.title ?? post.title,
            content: data.content ?? post.content,
            image: imageUrl
        }
    })
}

export const deletePostService = async (id:number) => {
    const post = await prismaClient.post.findUnique({ where: { id } })
    if (!post) return null;

    if (post.image) {
        const objectName = post.image.split('/').pop()
        if(objectName) await deleteFile(config.minioBucketName, objectName)
    }

    await prismaClient.post.delete({ where: { id } })
    return post
}
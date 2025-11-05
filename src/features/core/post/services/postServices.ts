import path from "path"
import { prismaClient } from "../../../../config/prisma"
import { deleteFile, uploadFile } from "../../../../services/storageServices/minioServices"
import config from "../../../../config/config"
import fs from "fs/promises";
import omitPassword from "../../../../utils/omitPassword";
import { handleImage } from "../../../../utils/uploadImage";

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
    let imageUrl: string | null = '';
    if(image) {
        imageUrl = await handleImage(image, 'posts')
    }

    return await prismaClient.post.create({
        data: {
            title,
            content,
            image: imageUrl ?? '',
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

    let imageUrl: string | null = post.image

    if (data.image) {
        imageUrl = await handleImage(data.image, 'posts', post.image)
    }

    return await prismaClient.post.update({
        where: { id },
        data: {
            title: data.title ?? post.title,
            content: data.content ?? post.content,
            image: imageUrl ?? post.image
        }
    })
}

export const deletePostService = async (id:number) => {
    const post = await prismaClient.post.findUnique({ where: { id } })
    if (!post) return null;

    if (post.image) {
        await handleImage(undefined, "posts", post.image, true);
    }

    await prismaClient.post.delete({ where: { id } })
    return post
}
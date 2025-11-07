import { Request, Response } from "express"
import { body, validationResult } from "express-validator"
import { errorResponse, successResponse } from "../../../../utils/response";
import { createPostService, deletePostService, getAllPostService, getPostByIdService, updatePostService } from "../services/postServices";

export const createPostController = [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),

    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return errorResponse('Validation Error', errors.array(), 400, res)
        }

        try {
            const { title, content } = req.body;
            const authorId = Number(req.user?.id);

            const post = await createPostService({
                title, content, authorId, image: req.file as Express.Multer.File
            })

            return successResponse('Post created successfully', post, 201, res)
        } catch (err: any) {
            return errorResponse(
                'Error',
                err.message,
                err.statusCode || 500,
                res
            );
        }
    }
]

export const getAllPostController = async (req: Request, res: Response) => {
    try {
        const posts = await getAllPostService()
        return successResponse('Post created successfully', posts, 200, res)
    } catch (err: any) {
        return errorResponse(
            'Error',
            err.message,
            err.statusCode || 500,
            res
        );
    }
}

export const getPostByIdController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const post = await getPostByIdService(id)
        if(!post) {
            return errorResponse('Post not found', 'Post not found', 404, res)
        } else {
            return successResponse('Post found successfully', post, 200, res)
        }
    } catch (err: any) {
        return errorResponse(
            'Error',
            err.message,
            err.statusCode || 500,
            res
        );
    }
}

export const updatePostController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const { title, content } = req.body

        const post = await updatePostService(id, {
            title,
            content,
            image:req.file as Express.Multer.File
        })

        if(!post) return errorResponse('Post not found', 'Post not found', 404, res)

        return successResponse('Post updated successfully', post, 200, res)
    } catch (err: any) {
        return errorResponse(
            'Error',
            err.message,
            err.statusCode || 500,
            res
        );
    }
}

export const deletePostController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const post = await deletePostService(id)
        if(!post) return errorResponse('Post not found', 'Post not found', 404, res)

        return successResponse('Post deleted successfully', post, 200, res)     
    } catch (err: any) {
        return errorResponse(
            'Error',
            err.message,
            err.statusCode || 500,
            res
        );
    }
}

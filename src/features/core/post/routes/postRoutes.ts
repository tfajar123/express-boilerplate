import { Router } from "express";
import { upload } from "../../../../middlewares/uploadFile";
import { createPostController, deletePostController, getAllPostController, getPostByIdController, updatePostController } from "../controllers/postController";
import { authMiddleware } from "../../../../middlewares/auth";
import adminMiddleware from "../../../../middlewares/admin";

const postRoutes: Router = Router()

postRoutes.post('/', [authMiddleware, adminMiddleware, upload.single('image')], createPostController)
postRoutes.get('/', getAllPostController)
postRoutes.get('/:id', getPostByIdController)
postRoutes.put('/:id', [authMiddleware, adminMiddleware, upload.single('image')], updatePostController)
postRoutes.delete('/:id', [authMiddleware, adminMiddleware], deletePostController)

export default postRoutes
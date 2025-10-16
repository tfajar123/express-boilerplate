import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { errorResponse, successResponse } from "../../../utils/response";
import { loginUserService, registerUserService } from "../services/authServices";

export const registerUserController = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return errorResponse('Validation Error', errors.array(), 400, res)
        }

        try {
            const { name, email, password, role } = req.body;
            const { user } = await registerUserService({
                name, email, password, role
            })

            const { password: _, ...userData } = user;
            return successResponse(
                'Registrasi berhasil',
                { user: userData },
                201,
                res
            );
        } catch (err: any) {
            return errorResponse(
                'Registrasi gagal',
                err.message,
                err.statusCode || 500,
                res
            );
        }
    }
];

export const loginUserController = [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required'),

    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return errorResponse('Validation Error', errors.array(), 400, res)
        }

        try {
            const { email, password } = req.body;
            const user = await loginUserService(email, password);

            return successResponse(
                'Login berhasil',
                { token: user.token },
                200,
                res
            );
        } catch (err: any) {
            return errorResponse(
                'Login gagal',
                err.message,
                err.statusCode || 500,
                res
            );
        }
    }
]

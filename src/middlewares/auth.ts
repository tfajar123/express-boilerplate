import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/response";
import { verifyToken } from "../utils/jwt";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if(!authHeader) {
        return errorResponse('Unauthorized', 'You are not Authorized to access this route', 401, res)
    }

    const token = authHeader.startsWith('Bearer ') 
        ? authHeader.slice(7).trim() 
    : authHeader.trim()

    try {
        const payload = verifyToken(token)
        req.user = payload
        next()
    } catch (err) {
        return errorResponse('Unauthorized', 'Your token is either invalid or expired', 401, res)
    }
}



export { authMiddleware }
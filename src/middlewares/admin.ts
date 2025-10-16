import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/response";

const adminMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== "ADMIN") {
        return errorResponse("Unauthorized", "You are not authorized to access this route", 401, res);
    }

    next();
}

export default adminMiddleware
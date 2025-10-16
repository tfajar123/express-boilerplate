import { Response } from "express";

export const successResponse = (
    message: any,
    data: any,
    code: number,
    res: Response
) => {
    res.status(code).json({
        status:code,
        message,
        data,
    });
};

export const errorResponse = (
    message: any,
    error: any,
    code: number,
    res: Response
) => {
    res.status(code).json({
        status:code,
        message,
        error,
    });
};

export const handleErrorResponse = (error: any, defaultMessage: string) => {
    let statusCode = 500;
    let errorMessage = error.response?.data || error.message;
    if(error.response && error.response.data) {
        const errorData = error.response.data
        if (errorData.issue && Array.isArray(errorData.issue)) {
            const duplicateIssue = errorData.issue.find(
                (issue: any) => issue.code === 'duplicate'
            );
            if(duplicateIssue) {
                statusCode = 409;
                errorMessage = duplicateIssue.message;
            }
        } else if (
            errorData.fault && errorData.fault.faultstring && errorData.fault.faultstring.includes('RF-')
        ) {
            statusCode = 409;
            errorMessage = errorData.fault.faultstring;
        }
    }
    return {
        statusCode,
        errorMessage,
        message: defaultMessage
    } 
};
import { Request ,Response , NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";

export const errorHandler=(
    err: Error,
    res: Response,
    req: Request,
    next: NextFunction
): void=>
    {
        if(err instanceof ApiError)
            {
                res.status(err.statusCode).json(
                    {
                        success:false,
                        statusCode: err.statusCode,
                        message: err.message,
                        errors: err.errors
                        // stack: process.env.NODE_ENV === "development" ? err.stack:undefined env not initalized fo this mini project
                    })
                    return
                }
    
            res.status(500).json({
                success:false,
                statusCode: 500,
                message: err.message || "Internal Server Error",
                errors:[],
                // stack: process.env.NODE_ENV === "development" ? err.stack:undefined env not initalized fo this mini project
            })
                
}
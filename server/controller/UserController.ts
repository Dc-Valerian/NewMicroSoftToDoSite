import { Request,Response,NextFunction } from "express";
import UserModel from "../model/UserModel";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError,HttpCode } from "../utils/AppError";

// to get all user
export const GetAllUser = asyncHandler(
    async(req:Request,res:Response,next:NextFunction):Promise<Response>=>{
        const user = await UserModel.find()
        if(!user){
            new AppError({
                message:"couldn't get all user",
                httpCode:HttpCode.NOT_FOUND,
            })
        }
        return res.status(HttpCode.OK).json({
            message:"Successfully got all users",
            data:user
        })
    }
)
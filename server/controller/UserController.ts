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

// to get a singleUser
export const SingleGet = asyncHandler(
    async(req:Request,res:Response,next:NextFunction):Promise<Response>=>{
        const user = await UserModel.findById(req.params.id).populate([
            {
                path:"myDay",
                options:{
                    sort:{
                        createdAt:-1,
                    },
                }
            },
            {
                path:"task",
                options:{
                    sort:{
                        createdAt:-1,
                    }
                }
            },
            {
                path:"assigned",
                options:{
                    sort:{
                        createdAt:-1,
                    }
                }
            }
        ])
        return res.status(HttpCode.OK).json({
            message:"Successfully got the single user",
            data:user
        })
    }
)

// to register a user
export const RegisterUser = asyncHandler(
    async(req:Request,res:Response,next:NextFunction):Promise<Response>=>{
        const {email,password,name} = req.body;

        const user = await UserModel.findOne({email});

        if(user){
            return res.status(HttpCode.OK).json({
                message:"User already exist"
            })
        }else{
            const registerUser = await UserModel.create({
                name,email,password
            });
            return res.status(HttpCode.OK).json({
                message:"User Successfully Registered",
                data:registerUser,
            })
        }
    }
)
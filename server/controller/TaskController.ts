import { Request,Response,NextFunction, json } from "express";
import mongoose from "mongoose";
import TaskModel from "../model/TaskModel";
import UserModel from "../model/UserModel";
import { HttpCode,AppError } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";

export const getTask = asyncHandler(
 async(req:Request,res:Response,next:NextFunction)=>{
    next(
        new AppError({
            message:"Found the Task",
            httpCode:HttpCode.OK
        })
    )
 }
)

export const getSingleTask = asyncHandler(
    async(req:Request,res:Response,next:NextFunction)=>{
        const myTask = await TaskModel.findById(req.params.id);

        return res.status(HttpCode.OK).json({
            message:"found",
            myTask,
        })

    }
)

export const CreateTask = asyncHandler(
    async(req:Request,res:Response,next:NextFunction)=>{
        const getUser = await UserModel.findById(req.params.userID)

        if(getUser){
            const {title,date} = req.body;

            let myDate = new Date().toDateString();

            const creatingTask = await TaskModel.create({
                title,
                date:date ? date :myDate,
                remainder:"",
                status:false,
                note:"",
                sender:"",
                reciever:"",
            });
            await getUser?.myDay.push(
                new mongoose.Types.ObjectId(creatingTask!._id),
            );
            await getUser?.task?.push(new mongoose.Types.ObjectId(creatingTask!._id))

            getUser.save();

            return res.status(200).json({
                message:"Successfully got Create Task",
                data:creatingTask,
            });
        }else{
            return res.status(404).json({
                message:"User not Found"
            });
        }
                return res.status(404).json({
                    message:"An error occurred while creating a task"
                })
    }
)

export const CompleteTask = asyncHandler(
    async(req:Request,res:Response,next:NextFunction)=>{
        const getUser = await UserModel.findById(req.params.userID)

        if(getUser){
            const completed = await TaskModel.findByIdAndUpdate(
                req.params.TaskID,
                {
                    status:true,
                },
                {
                    new:true,
                }
            );
            return res.status(200).json({
                message:"Updated Successfully",
                data:completed
            });
        }else{
            return res.status(400).json({
                message:"Access Denied"
            })
        }
    }
)

export const unCompleteTask = asyncHandler(
    async(req:Request,res:Response,next:NextFunction)=>{
        const getUser = await UserModel.findById(req.params.userID)

        if(getUser){
            const completed = await TaskModel.findByIdAndUpdate(
                req.params.TaskID,
                {
                    status:false,
                },
                {
                    new:true,
                }
            );
            return res.status(HttpCode.OK).json({
                message:"Updated Successfully",
                data:completed
            })
        }else{
            return res.status(HttpCode.BAD_REQUEST).json({
                message:"Access Denied"
            })
        }
    }
)

export const UpdateTask = asyncHandler(
    async(req:Request,res:Response,next:NextFunction)=>{
        const {note,title} = req.body;

        const completed = await TaskModel.findByIdAndUpdate(
            req.params.id,
            {
                note:note,
                title:title,
            },
            {
                new:true,
            }
        )
        if(completed){
            next(
                new AppError({
                    message:"An Error Occured while updaating task",
                    httpCode:HttpCode.BAD_REQUEST
                }))
                return res.status(HttpCode.CREATED).json({
                    completed
                })
        }
    }
)
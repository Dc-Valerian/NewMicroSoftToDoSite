import express,{Application,NextFunction,Request,Response} from "express"
import morgan from "morgan"
import cors from "cors"
import userRouter from "../Routes/UserRouter"
import taskRoute from "../Routes/TaskRouter"
import { AppError,HttpCode } from "../utils/AppError"

export const appConfig=(app:Application)=>{
    app.use(morgan("dev")).use(express.json()).use(cors()).use("/api",userRouter);

    app.use("/api/task",taskRoute)

    app.all("*",(req:Request,res:Response,next:NextFunction)=>{
        next(
            new AppError({
                message:`This Route ${req.originalUrl} doesn't exist`,
                httpCode:HttpCode.NOT_FOUND
            })
        )
    })
}
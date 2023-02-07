import mongoose from "mongoose";
import { taskData } from "../AllInterface";


interface UserData{
    name:string;
    email:string;
    password:string;
    myDay:any[];
    important:taskData[];
    planned:taskData[];
    assigned:taskData[];
    task:any[]
}

interface myData extends UserData,mongoose.Document{}

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
    myDay:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"tasks",
        },
    ],
    important:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"tasks",
        },
    ],
    planned:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"tasks",
        },
    ],
    assigned:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"tasks"
        }
    ],
    task:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"tasks"
        }
    ]
},{timestamps:true,versionKey:false})

export default mongoose.model<myData>("users",userSchema)
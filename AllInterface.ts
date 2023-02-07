import mongoose from "mongoose";

export type taskData ={
    title?:string;
    date?:string;
    remainder?:string;
    note?:string;
    status?:boolean;
}

export interface taskData2 {
    title?:string;
    date:string;
    remainder:string;
    note?:string;
    status:boolean;
    sender:string;
    reciever:string;
}
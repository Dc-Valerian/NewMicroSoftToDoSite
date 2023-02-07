import mongoose from "mongoose"
import { envVariable } from "./environment Variables"

const DB = envVariable.DB_STRING;

export async function dbConnect(){
    try {
        mongoose.set("strictQuery",true)
        const conn = await mongoose.connect(DB)
        console.log(`Microsoft DataBase is connected to ${conn.connection.host}`);
        
    } catch (error) {
        console.log(error);
        
    }
}
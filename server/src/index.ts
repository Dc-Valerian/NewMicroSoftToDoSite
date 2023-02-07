import express,{Application} from "express"
import { dbConnect } from "../config/DB";
import { envVariable } from "../config/environment Variables"
import { appConfig } from "./app";


const port = envVariable.PORT

const app:Application = express();

appConfig(app)
dbConnect()

app.listen(port,()=>{
    console.log(`Listening to LocalHost Port:${port}`);
    
})
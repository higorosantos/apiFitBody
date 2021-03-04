import { model, Schema , Document } from "mongoose";

interface User extends Document {
    name:string,
    email:string,
    senha:string
}


const userSchema:Schema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:String
    },
    senha:{
        type:String,
        required:true
    }
})

export default model<User>("User",userSchema);
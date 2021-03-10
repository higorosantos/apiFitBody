import { model, Schema , Document } from "mongoose";
import { Challenger }  from './Challenger'

export interface Image{
    key:string,
    originalName:string,
    url:string
}

export interface User extends Document {
    name:string,
    email:string,
    pwd:string,
    exp:number,
    challengesCompleted:[Challenger],
    profileImage:Image
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
    pwd:{
        type:String,
        required:true,
        select:false
    },
    exp:{
        type:Number,
        default: 0
    },
    challengesCompleted:{
        type: Array,
        default:[],
    },
    profileImage:{
        type:Object,
        default: null,
    }
},{ timestamps:true });


export default model<User>("User",userSchema);
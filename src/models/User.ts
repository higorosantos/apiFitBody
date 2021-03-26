import { Document, model, Schema } from "mongoose";
import { IChallenger } from './Challenger';


interface IImage{
    key:string,
    url:string
}

export interface IUser extends Document {
    name:string,
    email:string,
    pwd:string,
    exp:number,
    challengesCompleted:[IChallenger],
    profileImage:IImage
}
const userSchema:Schema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:String,
        trim:true
    },
    pwd:{
        type:String,
        required:true,
    },
    exp:{
        type:Number,
        default: 0
    },
    challengesCompleted:[{
        challengerId:String
    }],
    profileImage:{
        key:String,
        url:String
    }
},{ timestamps:true });


export default model<IUser>("User",userSchema);
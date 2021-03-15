import { Document, model, Schema } from "mongoose";
import { IChallenger } from './Challenger';


interface IImage{
    key:string,
    originalName:string,
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
        select:false,
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


export default model<IUser>("User",userSchema);
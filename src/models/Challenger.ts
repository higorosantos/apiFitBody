import { Schema, Document, model} from "mongoose";


export interface IChallenger extends Document{
    type:string,
    description:string,
    amount:number
}

const challengerSchema:Schema = new Schema({
    type:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }

}) 



export default model<IChallenger>('Challenger',challengerSchema);
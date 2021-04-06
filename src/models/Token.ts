import mongoose, { Schema, Document} from 'mongoose';


export interface IToken extends Document{
    userId:string,
    token:string,
    expireAt?:Date
}

const tokenSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    token:{
        type:String,
        require:true
    },
    expireAt:{
        type:Date,
        default:Date.now(),
        index:{ expires: '5d'}
    }

});


export default mongoose.model<IToken>("Token",tokenSchema);
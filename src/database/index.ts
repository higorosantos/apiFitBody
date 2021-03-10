import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

export default async ()=>{
    try{
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@cluster0.hnkrg.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,{ useNewUrlParser: true ,
        useUnifiedTopology: true })
        return console.log("Banco Conectado com sucesso!")
    }catch(e){
        return console.log("Houve um erro: ",e)
    }
}


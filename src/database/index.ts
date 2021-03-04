import mongoose, { Mongoose } from 'mongoose';
import config from '../config.json';

export default async ()=>{
    try{
        await mongoose.connect(`mongodb+srv://${config.Mongodb.user}:${config.Mongodb.senha}@cluster0.hnkrg.mongodb.net/${config.Mongodb.banco}?retryWrites=true&w=majority`,{ useNewUrlParser: true ,
        useUnifiedTopology: true })
        return console.log("Banco Conectado com sucesso!")
    }catch(e){
        return console.log("Houve um erro: ",e)
    }
}


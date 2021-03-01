import mongoose from 'mongoose';

export default async ()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/',{ useNewUrlParser: true ,
        useUnifiedTopology: true })
        return console.log("Banco Conectado com sucesso!")
    }catch(e){
        return console.log("Houve um erro: ",e)
    }
}


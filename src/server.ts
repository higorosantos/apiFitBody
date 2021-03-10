import express from 'express';
import database from './database'
import { router } from './router';


database();
const app  = express();
const port = 3350;

app.use(express.json());
app.use(router);

app.listen(port,'0.0.0.0',()=> console.log("Servidor Iniciado na porta: ",port))
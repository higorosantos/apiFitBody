import express from 'express';
import database from './database'
import { router } from './router';
import Cors from 'cors';


database();
const app  = express();
const port = 3350;

app.use(express.json());
app.use(Cors);
app.use(router);

app.listen(port,()=> console.log("Servidor Iniciado na porta: ",port))
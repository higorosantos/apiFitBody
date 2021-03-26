import express from 'express';
import './config/env';
import './database'
import Cors from 'cors';
import { router } from './router';

const app  = express();
const port = process.env.PORT;

app.use(express.json());
app.use(Cors())
app.use(router);

app.listen(port,'0.0.0.0',()=> console.log("Servidor Iniciado na porta: ",port))

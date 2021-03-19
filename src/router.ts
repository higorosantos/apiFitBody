import { Router } from 'express';
//import cors from 'cors';
import Multer from 'multer';

import { multerOptions } from './config/multerConfig';

import AuthController from './controllers/AuthController';
import UserController from './controllers/UserController';
import ChallengerController from './controllers/ChallengerController';
import AuthMiddleware from './middleware/AuthMiddleware';

const router = Router();

// router.use((req,res,next)=>{
//     res.header("Access-Control-Allow-Origin","*");
//     router.use(cors());
//     next();
// })

router.post('/users',UserController.create);
router.post('/auth',AuthController.authenticate);
router.get('/users',AuthMiddleware,UserController.get);
router.post('/imgUpload',Multer(multerOptions).single('file'),(req,res)=>{
    return res.send(req.file);
});
router.get('/challenger',ChallengerController.getAll);

export { router };


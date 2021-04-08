import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import Multer from 'multer';

import { multerOptions } from './config/multerConfig';

import AuthController from './controllers/AuthController';
import UserController from './controllers/UserController';
import ChallengerController from './controllers/ChallengerController';
import AuthMiddleware from './middleware/AuthMiddleware';

const router = Router();
const registerLimit = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5  
})
const findUserLimit = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10
})


router.post('/register',registerLimit,UserController.create);
router.post('/auth',AuthController.authenticate);
router.get('/challengers',ChallengerController.getAll);
router.post('/verify',UserController.verify);
router.post('/recoverpwd',(req,res)=>{
    res.json("TESTE");
})

////Rotas que precisam de token
router.get('/users',AuthMiddleware,UserController.get);
router.patch('/users/profileimage',AuthMiddleware,Multer(multerOptions).single('file'),UserController.changeProfileImage);
router.patch('/users/name',AuthMiddleware,UserController.changeName)
router.patch('/users/challengercompleted',AuthMiddleware,UserController.challengerCompleted);
router.patch('/users/password',AuthMiddleware,UserController.changePassword)
router.get('/users/:id',findUserLimit,AuthMiddleware,UserController.get);


//router.put('/users',AuthMiddleware,UserController.update);


export { router };


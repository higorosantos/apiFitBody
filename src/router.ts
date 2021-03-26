import { Router } from 'express';
//import cors from 'cors';
import Multer from 'multer';

import { multerOptions } from './config/multerConfig';

import AuthController from './controllers/AuthController';
import UserController from './controllers/UserController';
import ChallengerController from './controllers/ChallengerController';
import AuthMiddleware from './middleware/AuthMiddleware';

const router = Router();



router.post('/users',UserController.create);
router.post('/auth',AuthController.authenticate);
router.patch('/users/changePassword',AuthMiddleware,UserController.changePassword)
router.get('/users',AuthMiddleware,UserController.get);
router.put('/users',AuthMiddleware,UserController.update);
router.patch('/imgUpload',AuthMiddleware,Multer(multerOptions).single('file'),UserController.changeProfileImage);
router.get('/challengers',ChallengerController.getAll);

export { router };


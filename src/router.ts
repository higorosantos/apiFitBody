import { Router } from 'express';
import { UserController } from './controllers/UserController'
import cors from 'cors';
import { ChallengerController } from './controllers/ChallengerController';
import Multer from 'multer';
import { multerOptions } from './config/multerConfig';


const userController:UserController = new UserController()
const challengerController:ChallengerController = new ChallengerController

const router = Router();

router.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    router.use(cors());
    next();
})

router.post('/users',userController.create);
router.post('/authenticate',userController.authenticate);
router.get('/users',userController.getAll);
router.post('/imgUpload',Multer(multerOptions).single('file'),(req,res)=>{
    return res.send(req.file);
});
router.get('/challenger',challengerController.getAll);

export { router };


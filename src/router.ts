import { Router } from 'express';
import { UserController } from './controllers/UserController'
import cors from 'cors';

const userController:UserController = new UserController()

const router = Router();

router.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    router.use(cors());
    next();
})

//router.post('/user',userController.created);
router.post('/user',userController.get);

export { router };
import { Router } from 'express';
import { UserController } from './controllers/UserController'
import cors from 'cors';
import { ChallengerController } from './controllers/ChallengerController';

const userController:UserController = new UserController()
const challengerController:ChallengerController = new ChallengerController

const router = Router();

router.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    router.use(cors());
    next();
})

router.post('/user',userController.created);
router.post('/login',userController.get);
router.get('/challenger',challengerController.getAll);
export { router };
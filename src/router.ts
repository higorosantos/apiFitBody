import { Router } from 'express';
import { UserController } from './controllers/UserController'


const userController:UserController = new UserController()

const router = Router();

router.post('/user',userController.created);
router.get('/user',userController.get);

export { router };
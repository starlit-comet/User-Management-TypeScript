import express, {Router} from 'express'

import UserController from '../controllers/userController'

const router = Router()

const userController = new UserController();

router.get('/login',userController.getLogin)
router.get('/register',userController.getRegister)

export default router
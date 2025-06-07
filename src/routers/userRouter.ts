import express, {Router} from 'express'

import UserController from '../controllers/userController'

const router = Router()

const userController = new UserController();

router.route('/login')
    .get(userController.getLogin)
    .post(userController.postLogin)

router.route('/register')
    .get(userController.getRegister)
    .post(userController.postRegister)

router.route('/home')
    .get(userController.getHome)

export default router
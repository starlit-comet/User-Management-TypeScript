import express,{ Router } from "express";
import AdminController from "../controllers/adminController";


const adminController = new AdminController()
const router = Router()

router.route('/login')
    .get(adminController.getLogin)
    .post(adminController.postLogin)

router.route('/dashBoard')
    .get(adminController.getDashboard)

export default router


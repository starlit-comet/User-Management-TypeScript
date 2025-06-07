import { Request,Response } from 'express';
import pool from '../dbconfig/dbconnector'
import { HttpStatusCode } from '../constants/httpStatus';
import { HttpMessages } from '../constants/statusMessages';
import { LoginRequestBody , RegisterRequestBody } from '../interfaces/user.interface';
import bcrypt from 'bcrypt'
import { hash } from 'crypto';


class UserController {
    public async getLogin(req,res){
        try {
            return res.render('user/login.ejs')
        } catch (error) {
            console.log(error)
            res.status(HttpStatusCode.BAD_REQUEST).send(error)
        }
    }
    public async postLogin(req:Request,res:Response){
        try {
            const {email ,password}:LoginRequestBody  = req.body
            console.log('login details',email,password)
            const client = await pool.connect()
            const sql = `SELECT * FROM users WHERE email='${email}' AND password='${password}'`
            const {rows} = await client.query(sql)
            client.release()
            if(rows.length===1){

            }
            console.log('rows',rows)
        } catch (error) {
            console.log(error)
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error)
        }
    }
    public async getRegister(req,res){
        try {
            return res.render('user/register.ejs')
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    }

    public async postRegister(
        req:Request <{},{},RegisterRequestBody>,
        res:Response
    ):Promise<void>{
        try {
           const {email,password,name,}:RegisterRequestBody = req.body
            const client =await pool.connect()
            try{

                const sql = `SELECT * FROM users WHERE email = '${email}'`
                const {rows} = await client.query(sql)
                if(rows.length>0){
                     res.status(HttpStatusCode.CONFLICT).json({message:'Email Already Exists'})
                }
                const hashedPassword = await bcrypt.hash(password,10)
                const insertQuery = `
                                INSERT INTO users (name,email,password,role)
                                VALUES ('${name}','${email}','${hashedPassword}','User')
                                RETURNING  id,name,email,role
                                `
                const insertResult = await client.query(insertQuery)
                 res.status(HttpStatusCode.CREATED).json({
                    message:'User Registered successfully',
                    user:insertResult.rows[0],
                })
            }
            finally{
                client.release()
            }
            
        } catch (error) {
            console.log(error)
             res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({message:HttpMessages.INTERNAL_SERVER_ERROR})
        }
    }

    public async getHome(req:Request,res:Response){
        try {
             res.render('user/home.ejs',{ user: {
    name: 'Akshai',
    email: 'akshai@example.com'
  }})
        } catch (error) {
            
        }
    }
}

export default UserController
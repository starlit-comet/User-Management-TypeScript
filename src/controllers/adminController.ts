import { Request,Response } from 'express';
import pool from '../dbconfig/dbconnector'
import { HttpStatusCode } from '../constants/httpStatus';
import { HttpMessages } from '../constants/statusMessages';
import { LoginRequestBody ,Users } from '../interfaces/user.interface';
import bcrypt from 'bcrypt'
import { hash } from 'crypto';

const isPasswordValid = async(
                    plainPassword:string,
                    hashedPassword:string,
                ):Promise<boolean> =>{
                    return await bcrypt.compare(plainPassword,hashedPassword)
                }

class AdminController {
    public async getLogin(req:Request,res:Response){
        try {
            res.render('admin/login.ejs')
        } catch (error) {
            console.log(error)
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({message:HttpMessages.INTERNAL_SERVER_ERROR})
        }
    }

    public async postLogin(req:Request,res:Response){
        try {
            const {email,password} : LoginRequestBody = req.body
            const client = await pool.connect()
            try {
                const sql=`SELECT * FROM users WHERE email= '${email}' AND role='Admin'`
                const {rows} = await client.query(sql)
                if(rows.length<1){
                    res.status(HttpStatusCode.NOT_FOUND).json({message:'Email Not Found'})
                }
                const user=rows[0]
                const passwordMatch = await isPasswordValid(password,user.password)

                if(!passwordMatch){
                    res.status(HttpStatusCode.UNAUTHORIZED).json({message:'Invalid Credentials'})
                    return;
                }

                res.status(HttpStatusCode.OK).json({message:'Login successful'})
                
            } catch (error) {
                console.log(error)
                res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({message:HttpMessages.INTERNAL_SERVER_ERROR})
            }
        } catch (error) {
            console.log(error)
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({message:HttpMessages.INTERNAL_SERVER_ERROR})
        }
    }

    public async getDashboard(req:Request,res:Response){
        try {

            const client = await pool.connect()
            const sqlQuery = `SELECT id,name,email,role FROM users where role='User'`

            const {rows} = await client.query(sqlQuery)

            const users : Users[] = rows
            res.status(HttpStatusCode.OK).render('admin/dashboard.ejs',{users})
        } catch (error) {
            
        }
    }
}
export default AdminController
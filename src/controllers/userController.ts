import pool from '../dbconfig/dbconnector'

class UserController {
    public async getLogin(req,res){
        try {
            return res.render('user/login.ejs')
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
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
}

export default UserController
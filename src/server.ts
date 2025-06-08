import path from 'path'
import  express,{Application,Router}  from "express";
import bodyParser from "body-parser";
import pool from './dbconfig/dbconnector'
import session from 'express-session';

import userRouter from './routers/userRouter'
import adminRouter from './routers/adminrouter'

class Server {
    private  app:Application;

    constructor(){
        this.app = express();
        this.config();
        this.routerConfig();
        this.dbConnect();
    }
    private config(){
        this.app.use(bodyParser.urlencoded({extended:true}));
        this.app.use(bodyParser.json({limit:'1mb'}))
        this.app.set('view engine','ejs')
        this.app.set('views', path.join(process.cwd(), 'src', 'views'));
        this.app.use(express.static(path.join(__dirname,'..','public')))
        this.app.use(session({
            secret:'session_secret_key',
            resave:false,
            saveUninitialized:false,
            cookie:{
                maxAge :1000*60*60,
                secure:false
            }
        }))
    }
    private dbConnect(){
        pool.connect((err,client,done)=>{
            if(err) throw new Error(err);
            console.log('Db connected')
        });
    }
    private routerConfig(){
         this.app.use('/user',userRouter)
         this.app.use('/admin',adminRouter)
    }
    public start = (port:number) =>{
        return new Promise((resolve,reject)=>{
            this.app.listen(port,()=>{
                resolve(port);
            }).on('error',(err:Object)=>reject(err))
        })
    }
}

export default Server;
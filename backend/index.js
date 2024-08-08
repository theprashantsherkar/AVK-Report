import express from 'express'
import { config } from 'dotenv';
import userRoute from './routes/user.js'
import bodyParser from 'body-parser';
import Color from 'color';
import cookieParser from 'cookie-parser';
import cors from 'cors';



export const app = express();

config({
    path:'./database/config.env'
})
app.use(cors({
    origin: process.env.FRONTEND_URL,

}))

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', userRoute);



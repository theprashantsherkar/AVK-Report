import express from 'express'
import { config } from 'dotenv';
import userRoute from './routes/user.js'
import bodyParser from 'body-parser';
import Color from 'color';
import cookieParser from 'cookie-parser';
import assessmentRouter from './routes/assessment.js'
import cors from 'cors';
import examRouters from './routes/exam.js'
import SubjectRouter from './routes/subject.js';


export const app = express();

config({
    path:'./database/config.env'
})
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', userRoute);
app.use('/subject', SubjectRouter);
app.use('/exam', examRouters);
app.use('/assessment', assessmentRouter);
import express from 'express'
import { config } from 'dotenv';
import userRoute from './routes/user.js'
import bodyParser from 'body-parser';
import Color from 'color';
import cookieParser from 'cookie-parser';
import assessmentRouter from './routes/assessment.js'
import cors from 'cors';
import examRouters from './routes/exam.js'
import teacherRoutes from './routes/teacher.js'
import SubjectRouter from './routes/subject.js';
import reportRoute from './routes/report.js'
import RubricRouter from './routes/rubric.js'


export const app = express();

config({
    path:'./database/config.env'
})
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    AccessControlAllowOrigin: true,
    AccessControlAllowHeaders: true,
    AccessControlAllowMethods: true,
    AccessControlAllowCredentials: true,


}))
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', userRoute);
app.use('/report', reportRoute);
app.use('/subject', SubjectRouter);
app.use('/exam', examRouters);
app.use('/assessment', assessmentRouter);
app.use('/teacher', teacherRoutes);
app.use('/rubrics', RubricRouter);
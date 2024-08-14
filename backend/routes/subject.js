import express from "express";
import { addSubject, getAllSubjects } from "../controller/subject.js";

const router = express.Router();

router.get('/getSubjects', getAllSubjects);
router.post('/addSubject', addSubject);



export default router;
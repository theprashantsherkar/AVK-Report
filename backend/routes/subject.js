import express from "express";
import { addSubject, getAllSubjects, removeSub } from "../controller/subject.js";

const router = express.Router();

router.get('/getSubjects', getAllSubjects);
router.post('/addSubject', addSubject);
router.route('/:id').delete(removeSub);



export default router;
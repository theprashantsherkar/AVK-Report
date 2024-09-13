import express from "express";
import { addSubject, getAllSubjects, removeSub, updateSub } from "../controller/subject.js";

const router = express.Router();

router.get('/getSubjects', getAllSubjects);
router.post('/addSubject', addSubject);
router.route('/:id')
    .put(updateSub)
    .delete(removeSub);



export default router;
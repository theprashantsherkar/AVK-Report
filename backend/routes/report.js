import express from "express";

import { generateResult, sendGrades, sendMarks, getClasses, showStudents, sendRemarks, getEachResult, sendEachMarks, sendEachGrades, sendJustGrade } from "../controller/report.js";


const router = express.Router();

router.post('/classes', getClasses)
router.post('/students', showStudents);
router.post('/sendMarks', sendMarks)
router.post('/sendGrades', sendGrades)
router.post('/report', generateResult)
router.post('/sendRemarks', sendRemarks)


router.post('/getEachResult', getEachResult)
router.post('/sendEachMarks', sendEachMarks)
router.post('/sendEachGrades', sendEachGrades)
router.post('/sendJustGrade', sendJustGrade)



export default router;
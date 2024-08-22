import express from "express";

import { generateResult, sendGrades, sendMarks, getClasses, showStudents } from "../controller/report.js";


const router = express.Router();

router.post('/classes', getClasses)
router.post('/students', showStudents);
router.post('/sendMarks', sendMarks)
router.post('/sendGrades', sendGrades)
router.post('/report', generateResult)





export default router;
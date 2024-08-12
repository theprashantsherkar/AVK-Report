import express from "express";
import { generateResult, sendGrades, sendMarks } from "../controllers/report.js";


const router = express.Router();

router.post('/sendMarks', sendMarks)
router.post('/sendGrades', sendGrades)
router.post('/report', generateResult)





export default router;
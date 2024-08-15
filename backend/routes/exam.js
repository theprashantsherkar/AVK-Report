import express from 'express';
import { addSubjects, createExam, getAllExams, getExamDetails, removeExam } from '../controller/exam.js';

const router = express.Router();

router.get('/getExam', getAllExams);
router.post('/newExam', createExam)
router.post('/addsubjects', addSubjects);
router.get('/getDetails', getExamDetails);
router.delete('/:id',removeExam)

export default router;
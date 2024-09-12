import express from 'express';
import { addSubjects, createExam, getAllExams, getExamDetails, getOldSubjects, getTeachers, removeExam, updateSubs } from '../controller/exam.js';

const router = express.Router();

router.get('/getExam', getAllExams);
router.post('/newExam', createExam)
router.post('/addsubjects/:id', addSubjects);
router.put('/updateSubs/:id', updateSubs);
router.get('/old/:id', getOldSubjects);
router.get('/getDetails', getExamDetails);
router.delete('/:id', removeExam)
router.get('/getTeachers', getTeachers)

export default router;
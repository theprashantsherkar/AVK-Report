import express from 'express';
import { getAssessmentsForTeacher, getClasses, getSubjects, showStudents } from '../controller/teacher.js';

const router = express.Router();

router.post('/classes', getClasses);
router.post('/subjects', getSubjects);
router.post('/students', showStudents)
router.post('/ass', getAssessmentsForTeacher);

export default router;
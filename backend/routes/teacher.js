import express from 'express';
import { getClasses, getSubjects, showStudents } from '../controller/teacher.js';

const router = express.Router();

router.post('/classes', getClasses);
router.post('/subjects', getSubjects);
router.post('/students', showStudents)

export default router;
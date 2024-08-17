import express from 'express';
import { addAssessment, getAllAssessments, specificAss } from '../controller/assessment.js';

const router = express.Router();

router.get('/getAll', getAllAssessments);
router.post('/addAssessment', addAssessment);
router
    .route("/:id")
    .get(specificAss)

export default router;
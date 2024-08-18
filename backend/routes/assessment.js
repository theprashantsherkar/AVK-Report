import express from 'express';
import { addAssessment, addRubrics, deleteAss, getAllAssessments, sendSubs, specificAss, UpdateAss } from '../controller/assessment.js';

const router = express.Router();

router.get('/getAll', getAllAssessments);

router
    .route("/:id")
    .post(addAssessment)
    .get(specificAss)
    .delete(deleteAss)
    .put(UpdateAss)



router.put('/rubrics/:id', addRubrics);

router.get('/sendsubjects/:id', sendSubs)


export default router;
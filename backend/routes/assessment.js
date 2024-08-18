import express from 'express';
import { addAssessment, addRubrics, deleteAss, deleteRubric, getAllAssessments, getRubrics, sendSubs, specificAss, UpdateAss } from '../controller/assessment.js';

const router = express.Router();

router.get('/getAll', getAllAssessments);

router
    .route("/:id")
    .post(addAssessment)
    .get(specificAss)
    .delete(deleteAss)
    .put(UpdateAss)

router.delete('/:id/deleteRubric', deleteRubric);

router
    .route('/rubrics/:id')
    .put(addRubrics)
    .get(getRubrics)

router.get('/sendsubjects/:id', sendSubs)


export default router;
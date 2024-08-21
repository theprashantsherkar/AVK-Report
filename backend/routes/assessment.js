import express from 'express';
import { addAssessment, deleteAss, getAllAssessments, sendSubs, specificAss, UpdateAss } from '../controller/assessment.js';

const router = express.Router();

router.get('/getAll', getAllAssessments);

router
    .route("/:id")
    .post(addAssessment)
    .get(specificAss)
    .delete(deleteAss)
    .put(UpdateAss)




router.get('/sendsubjects/:id', sendSubs)


export default router;
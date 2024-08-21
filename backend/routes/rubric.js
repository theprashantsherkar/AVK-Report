import express from "express";

import { getSpecificRubrics, getAllRubrics, editRubric, deleteRubric } from "../controller/rubric.js";


const router = express.Router();

router.get('/getAllRubrics', getAllRubrics);
router.get('/getRubrics/:id', getSpecificRubrics);
router.put('/update/:id', editRubric);
router.delete('/:id', deleteRubric);


export default router;


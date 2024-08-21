import express from "express";

import { getSpecificRubrics, getAllRubrics, editRubric, deleteRubric, addRubrics } from "../controller/rubric.js";


const router = express.Router();

router.get('/getAllRubrics', getAllRubrics);   //tested
router.post('/add/:id', addRubrics)   //tested
router.get('/getRubrics/:id', getSpecificRubrics);    //tested
router.put('/update/:id', editRubric);   //tested
router.delete('/:id', deleteRubric);


export default router;


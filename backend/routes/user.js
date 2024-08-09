import express from "express";
import { getAllUsers, loginFunc, logoutFunc, signInFunc } from "../controller/user.js";

const router = express.Router();

router.get('getAll', getAllUsers);
router.post('/login', loginFunc)
router.post('/register', signInFunc)
router.get('/logout', logoutFunc)

export default router;
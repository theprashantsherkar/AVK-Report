import express from "express";
import { getAllUsers } from "../controller/user.js";

const router = express.Router();

router.get('getAll',getAllUsers);

export default router;
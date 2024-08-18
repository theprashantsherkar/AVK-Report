import express from "express";
import { loginFunc, logout, getStudents, getUsers, signinFunc, changePass, profile, dashboardAPI} from "../controller/user.js";
import { isAuthenticated } from '../middlewares/auth.js';
import { upload } from '../middlewares/multer.js';


const router = express.Router();

router.post('/login', loginFunc)  //tested
router.post('/register', signinFunc)  //tested
router.put('/changepass', isAuthenticated, changePass);//tested
router.get('/profile', isAuthenticated, profile); //tested
router.post('/upload', isAuthenticated, upload.single('file'), dashboardAPI);//todo: integration remaining
router.get('/getallusers', isAuthenticated, getUsers);
router.get('/fetchStudents', isAuthenticated, getStudents); //tested

router.get('/logout', logout);   //tested

export default router;
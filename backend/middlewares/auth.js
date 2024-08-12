import jwt from 'jsonwebtoken';
import { User } from '../model/userModel.js';

export const isAuthenticated = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.json({
        success: false,
        message: "login first!"
    })
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(decoded._id);
    next();
}
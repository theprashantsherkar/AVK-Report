import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    subject: {
        type: String,
   
    },
    createdAt: {
        type: Date,
        default:new Date(Date.now())
    }
})



export const Subject = mongoose.model('Subjects', subjectSchema);
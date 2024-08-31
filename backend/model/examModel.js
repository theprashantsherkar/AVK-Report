import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
    Class: {
        type: String,
        required: true
    },
    session: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        required: true,

    },
    createdBy: {
        type: String,
        
    },
    subjects: {
        type: [mongoose.Types.ObjectId],
        ref:"Subjects"
    },
    canDelete: {
        type: Boolean,
        default: true
    },

    createdAt: {
        type: String,
        default: `${new Date(Date.now()).getDate()}-${new Date(Date.now()).getMonth()+1}-${new Date(Date.now()).getFullYear()}`
    }
})


export const Exam = mongoose.model('Exams', examSchema);
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
    subjects: {
        //todo:mapping of the subjects ka collections
    },

    createdAt: {
        type: String,
        default: `${new Date(Date.now()).getDate()}-${new Date(Date.now()).getMonth()}-${new Date(Date.now()).getFullYear()}`
    }
})


export const Exam = mongoose.model('Exams', examSchema);
import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
    student: {
        type: mongoose.Types.ObjectId,
        ref: "students",
        required: true,
    },
    credentials: {
        type: Object,
    },
    exam: {
        type: mongoose.Types.ObjectId,
        ref: "Exams",
    },
    assessment: {
        type: mongoose.Types.ObjectId,
        ref: "Assessments",
    }
    ,
    Class: {
        type: String,
        required: true,
    },
    session: {
        type: Number,
        default: new Date(Date.now()).getFullYear()
    },
    marks: {
        type: Number,

    },
    grade: {
        type: [Object],
    },
    remarks: {
        type: String
    }

})

export const Result = mongoose.model("Results", resultSchema);
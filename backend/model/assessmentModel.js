import mongoose from "mongoose"


const AssessmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    term: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    },
    maxMarks: {
        type: Number,
    },
    isRubrics: {
        type: String,
    },
    rubrics: {
        type: [String],

    },
    subject: {
        type: String
    },
    parentExam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "exam datas"
    },
    Class: {
        type: String,

    }
})

export const Assessment = mongoose.model("Assessments", AssessmentSchema);
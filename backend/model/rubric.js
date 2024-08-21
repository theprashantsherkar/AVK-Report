import mongoose from "mongoose";

const rubricSchema = new mongoose.Schema({
    rubric: {
        type: String,
        required:true
    },
    parentAssessment: {
        type: mongoose.Types.ObjectId,
        ref:"Assessments"
    },
    createdAt: {
        type: Date,
        default: new Date(Date.now())
    }
})



export const Rubric = mongoose.model("Rubrics", rubricSchema);
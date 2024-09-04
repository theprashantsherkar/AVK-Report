import mongoose from "mongoose";

const rubricSchema = new mongoose.Schema({
    rubric: {
        type: String,
        
    },
    parentAssessment: {
        type: mongoose.Types.ObjectId,
        ref:"Assessments"
    },
    createdAt: {
        type: Date,
        default: new Date(Date.now())
    },
    canDelete: {
        type: Boolean,
        default: true
    },
})



export const Rubric = mongoose.model("Rubrics", rubricSchema);
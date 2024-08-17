import { Assessment } from '../model/assessmentModel.js';
import { Exam } from '../model/examModel.js';


export const getAllAssessments =async (req, res) => {
    const assessments = await Assessment.find({});
    if (!assessments || assessments.length == 0) {
        return res.status(404).json({
            success: false,
            message:"no assessments added yet"
        })
    }
    res.status(200).json({
        success: true,
        message: "assessments fetched successfully",
        assessments,
    })
}



export const addAssessment = async(req, res) => {
    const examId = req.params.id;

    const parentExam = await Exam.findById(examId);

    const { title, subject, term, type, maxMarks, isRubrics} = req.body;
    if (!title || !subject || !term || !type) {
        return res.status(500).json({
            success: false,
            message: "Please enter all fields"
        })
    }

    const assessment = await Assessment.create({
        title,
        type,
        term,
        subject,
        maxMarks,
        isRubrics,
        parentExam: examId,
        Class: parentExam.Class,

    })

    if (!assessment) {
        return res.status(500).json({
            success: false,
            message:"Assessment not created, Try again!"
        })
    }


    return res.status(200).json({
        success: true,
        message: "Assessment created successfully",
        assessment,
    })
}


export const specificAss = async (req, res) => {
    const examId = req.params.id;
    if (!examId) {
        return res.status(500).json({
            success: false,
            message: "Exam id not found",
        })
    }
    
    const assessment = await Assessment.find({ parentExam: examId });
    if (!assessment || assessment.length == 0) {
        return res.status(404).json({
            success: false,
            message:"assessments not found",
        })
    }

    return res.status(200).json({
        success: true,
        message: "assessments found",
        assessment,

    })
}
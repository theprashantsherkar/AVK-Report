import { Assessment } from '../model/assessmentModel.js';
import { Exam } from '../model/examModel.js';


export const getAllAssessments =async (req, res) => {
    const assessments = await Assessment.find({}).populate("rubrics");
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

    const { title, selectedOptions, term, type, maxMarks, isRubrics} = req.body;
    if (!title || !selectedOptions.length || !term || !type) {
        return res.status(500).json({
            success: false,
            message: "Please enter all fields"
        })
    }

    const subjectNames = selectedOptions.map(item => item.subject)

    const assessments = subjectNames.map(async(subject) => {
        await Assessment.create({
            title,
            type,
            term,
            subject,
            maxMarks,
            isRubrics,
            parentExam: examId,
            Class: parentExam.Class,

        })
    })


    if (!assessments.length) {
        return res.status(500).json({
            success: false,
            message:"Assessment not created, Try again!"
        })
    }


    return res.status(200).json({
        success: true,
        message: "Assessment created successfully",
        assessments,
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

    const assessment = await Assessment.find({ parentExam: examId }).populate("rubrics");
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



export const deleteAss = async (req, res, next) => {
    try {
        const assId = req.params.id;
        const assessment = await Assessment.findById(assId);

        if (!assessment) {
            return res.status(404).json({
                success: false, // Corrected typo here
                message: "No assessment found"
            });
        }

        // Perform the delete operation
        await assessment.deleteOne();

        // Return success response
        return res.status(200).json({
            success: true,
            message: "Assessment deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting assessment:", error);
        return res.status(500).json({
            success: false,
            message: "Delete operation failed"
        });
    }
};

export const UpdateAss = async (req, res, next) => {
    const {id} = req.params
    const assessment = await Assessment.findById(id);
    if (!assessment) {
        return res.status(404).json({
            success: false,
            message: "no assessment found"
        })
    }
    const { title, term, type, maxMarks, isRubrics } = req.body;

    title ? assessment.title = title : assessment.title
    term ? assessment.term = term : assessment.term
    type ? assessment.type = type : assessment.type
    maxMarks ? assessment.maxMarks = maxMarks : assessment.maxMarks
    isRubrics ? assessment.isRubrics = isRubrics : assessment.isRubrics

    const isUpdated = await assessment.save();
    if (!isUpdated) {
        return res.status(500).json({
            success: false,
            message: "Couldn't Update, Internal Server Error!"
        })
    }

    res.status(200).json({
        success: true,
        message: "Updated successully",
        assessment
    })
}




export const sendSubs = async (req, res, next) => {
    const { id } = req.params;
    const exam = await Exam.findById(id).populate("subjects");
    if (!exam) {
        return res.json({
            success: false,
            message: "no exam found"
        })
    }
    const subjects = exam.subjects;
    if (!subjects) {
        return res.json({
            success: false,
            message: "select subjects first!"
        })

    }

    
    res.status(200).json({
        success: true,
        message: "subjects sent",
        subjects,
    })
}


export const getRubrics = async (req, res) => {
const { Combined, subject } = req.body;
const temp = Combined?.split(" - ");
const Class = temp[0];
const section = temp[1];
const title = temp[2];

    const assessment = await Assessment.findOne({Class:Class, title:title, subject:subject });
    if (!assessment) {
        return res.status(404).json({
            success: false,
            message: "no assessment found"
        })
    }
    res.status(200).json({
        success: true,
        message: "rubrics sent",
        assessment,
    })
}
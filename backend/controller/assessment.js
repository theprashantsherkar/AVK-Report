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
    const assessment = await Assessment.findById({ _id: req.params.id })
    if (!assessment) {
        return res.status(404).json({
            success: false,
            message: "no assessment found"
        })
    }
    const isDeleted = await assessment.deleteOne();
    if (!isDeleted) {
        return res.status(500).json({
            success: false,
            message: "delete operation failed",

        })
    }
    return res.status(200).json({
        success: true,
        message: "assessment deleted successfully"
    })
}

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

    const subjectNames = [];

    subjects.map((element) => {
        subjectNames.push(element.subject);
    })
    res.status(200).json({
        success: true,
        message: "subjects sent",
        subjectNames
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
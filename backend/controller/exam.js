import { Exam } from '../model/examModel.js';
import { Subject } from '../model/subjects.js';

export const getAllExams = async (req, res) => {
    const exams = await Exam.find({ });
    if (!exams || exams.length == 0) {
        return res.status(404).json({
            success: false,
            message:"no exams found"
        })
    }
    res.status(200).json({
        success: true,
        message: "exams found successfully",
        exams
    })
}

export const createExam = async(req, res) => {
    const { Class, teacher, section, session } = req.body;
    if (!Class || !teacher || !section || !session) {
        return res.json({
            success: false,
            message:"enter all fields",
        })
    }
    const newExam = await Exam.create({
        Class,
        teacher,
        section,
        session
    })
    if (!newExam) {
        return res.json({
            success: false,
            message:"Cant create Exam, try later."
        })
    }
    res.status(200).json({
        success: true,
        message: "Exam created Successfully",
        newExam,
    })
}

export const addSubjects = async(req, res) => {
    const { ids } = req.body
    const id = req.query.id;

    const subjects = await Subject.find({ _id: { $in: ids } });

    if (subjects.length !== ids.length) {
        return res.json({
            success: false,
            message:"Some subjects not found"
        })
    }
    const exam = await Exam.findById(id);
    ids.forEach(element => {
        exam.subjects.push(element);
    });

    const isSaved = await exam.save();
    if (!isSaved) {
        return res.json({
            success:false,
            message:"Something went wrong"
        })

    }
    res.status(200).json({
        success: true,
        message:"subjects added successfully"
    })


}

export const getExamDetails = async (req, res) => {
    const { id } = req.body;
    const exam = await Exam.findById(id).populate('subjects');
    res.status(200).json({
        success: true,
        message:"exams details fetched",
        exam
    });
}

export const deleteExam = async (req, res) => {
    const id = req.query
    const exam = await Exam.findById(id)
    const isDeleted = await exam.deleteOne();
    if (!isDeleted) {
        return res.json({
            success: false,
            message:"Cant Delete this Exam"
        })
    }

    res.status(200).json({
        success: true,
        message:"Exam deleted successfully."
    })
}


export const removeExam =async (req, res) => {
    const id = req.params.id
    const exam = await Exam.findById(id);
    await exam.deleteOne();
    res.status(200).json({
        success: true,
        message:"Exam deleted"
    })
}
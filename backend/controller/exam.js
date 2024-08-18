import { User } from '../model/userModel.js';
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
    const { selectedSubjects } = req.body;
    const id = req.query.id;


    if (!selectedSubjects || selectedSubjects.length == 0) {
        return res.json({
            success: false,
            message: "Select Subjects first."
        })
    }

    const subjects = await Subject.find({ subject: { $in: selectedSubjects } });

    const ids = subjects.map(element => element._id);

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
    try {
        const exam = await Exam.findById(id);
        if (exam) {
            await exam.deleteOne();
             return res.status(200).json({
                success: true,
                message: "Exam deleted"
            })
        }
        return res.json({
            success: false,
            message:"no exam found"
        })
    } catch (error) {
        console.log(error);
    }
}

export const getOldSubjects = async(req, res) => {
    const id = req.params.id;

    const exam = await Exam.findById(id).populate('subjects');

    if (Array.isArray(exam)) {
        const subjects = exam.map((element) => element.subjects);
        var subjectNames = subjects.map((element) => element.subejct);
    }
    else {
        var subjectNames = exam.subjects.map(subject => subject.subject);
    }

    if (!subjectNames || subjectNames.length == 0) {
         return res.status(404).json({
            success: false,
            message: "No Subjects added yet",
            subjectNames,
        })
    }

    res.status(200).json({
        success: true,
        message: "subjects listed",
        subjectNames
    })
}


export const getTeachers =async (req, res) => {
    const teachers = await User.find({});
    if (!teachers || teachers.length == 0) {
        return res.status(404).json({
            success: false,
            message:"no teachers found"
        })
    }

    const names = [];
    teachers.map((element) => {
        names.push(element.name);
    })

    res.status(200).json({
        success: true,
        message: "teahcers found!",
        names
    })
}



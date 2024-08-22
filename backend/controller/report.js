import { Result } from "../model/result.js";
import { Student } from "../model/studentModel.js";
import { Exam } from "../model/examModel.js";
import { Assessment } from "../model/assessmentModel.js"

export const sendMarks = async (req, res) => {
    const { studentId, examId, assessmentId } = req.query;
    const { marks, remarks } = req.body;

    const student = await Student.findById(studentId);
    const exam = await Exam.findById(examId);
    const assessment = await Assessment.findById(assessmentId);

    if (!marks || !remarks) {
        return res.status(400).json({
            success: false,
            message: "Enter Marks and Remarks first"
        })
    }
    if (student.Class !== exam.Class) {
        return res.status(500).json({
            success: false,
            message: "Student is in different class and exam is of different Class"
        })
    }

    const resultAdded = await Result.create({
        student: student._id,
        exam: exam._id,
        assessment: assessment._id,
        Class: student.Class,
        marks: marks,
        remarks: remarks,
        credentials: {
            name: student.name,
            Class: student.Class,
            roll: student.rollNum,
            assessment: assessment.title,
            subject: assessment.subject,
        }
    })
    if (!resultAdded) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, Please try later."
        })
    }
    res.status(200).json({
        success: true,
        message: "Marks Added Successfully.",
        result: resultAdded,

    })

}

export const sendGrades = async (req, res) => {
    const { studentId, examId, assessmentId } = req.query;
    const { grade } = req.body;

    if (!grade) {
        return res.status(400).json({
            success: false,
            message: "Enter Grades first"
        })
    }

    const student = await Student.findById(studentId);
    const exam = await Exam.findById(examId);
    const assessment = await Assessment.findById(assessmentId);

    const grades = assessment.rubrics.reduce((acc, curr, index) => {
        acc[curr] = grade[index];
        return acc;
    }, {});

    const resultAdded = await Result.create({
        student: student._id,
        exam: exam._id,
        assessment: assessment._id,
        credentials: {
            name: student.name,
            Class: student.Class,
            roll: student.rollNum,
            assessment: assessment.title,
            subject: assessment.subject,
        },
        Class: student.Class,
        grade: grades,
    })
    if (!resultAdded) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, Please try later."
        })
    }
    res.status(200).json({
        success: true,
        message: "Grades Added Successfully.",
        result: resultAdded,

    })

}


export const generateResult = async (req, res, next) => {
    try {
        const studentIds = req.body.id;
        if (!Array.isArray(studentIds)) {
            return res.status(400).json({
                success: false,
                message: "Invalid input, expected an array of IDs"
            });
        }

        const resultPromises = studentIds.map((element) => Result.find({ student: element }));
        const results = await Promise.all(resultPromises);
        if (!results) {
            return res.status(404).json({
                success: false,
                message: "Marks/Grades not added!",
            })
        }

        res.status(200).json({
            success: true,
            message: "Here are the results",
            results,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
        console.log(error);
    }
};


export const getClasses = async (req, res) => {
    try {
        const { teacher } = req.body;

        if (!teacher) {
            return res.status(400).json({
                success: false,
                message: "Teacher name is required",
            });
        }

        const exam = await Exam.find({ teacher });

        const ids = exam.map(foo => foo._id);
        const assessment = await Assessment.find({ parentExam: ids }).populate("parentExam");

        if (!exam || exam.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No exam found for the given teacher",
            });
        }

        const classDetailsSet = new Set(
            assessment.map(element => `${element.Class} - ${element.parentExam.section}`)
        );

        const classDetails = Array.from(classDetailsSet);

        if (!classDetails.length) {
            return res.status(500).json({
                success: false,
                message: "No classes found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Classes found",
            classes: classDetails,
            assessment
        });
    } catch (error) {
        console.error('Error fetching classes:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};



export const showStudents = async (req, res) => {
    const { combined } = req.body;
    const temp = combined.split(" - ");
    const Class = temp[0];
    const section = temp[1];

    const students = await Student.find({ Class: Class, section: section });

    if (!students || students.length == 0) {
        return res.json({
            success: false,
            message: "no student exists of this class"
        })
    }

    res.status(200).json({
        success: true,
        message: "Students fetched",
        students,
    })
}

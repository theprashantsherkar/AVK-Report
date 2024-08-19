import { Assessment } from "../model/assessmentModel.js";
import { Exam } from "../model/examModel.js";
import { Student } from "../model/studentModel.js";

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

        // Use a Set to store unique class details
        const classDetailsSet = new Set(
            assessment.map(element => `${element.Class} - ${element.parentExam.section} - ${element.title}`)
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
        });
    } catch (error) {
        console.error('Error fetching classes:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};



export const getSubjects = async (req, res) => {
    const { Combined } = req.body;
    const str = String(Combined);
    const temp = str.split(" - ");
    const Class = temp[0];
    const section = temp[1];
    const title = temp[2];
    
    

    const exam = await Exam.find({ Class:Class, section:section, }).populate("subjects");

    if (!exam || exam.length == 0) {
        return res.json({
            success: false,
            message:"no subjects found"
        })
    }

    const subjects = exam.map(element => element.subjects);
    const names = subjects[0].map(element => element.subject);

    res.status(200).json({
        success: true,
        message: "subjects fetched",
        names,
        subjects
    })

}


export const showAss =async (req, res) => {
    const { combined, subject } = req.body;
    const temp = combined.split(" - ");
    const Class = temp[0];
    const section = temp[1];
    const title = temp[2];

    const exam = await Exam.find({ Class: Class, section: section });
    if (!exam || exam.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No exam found for the given teacher",
        });
    }
    const ids = exam.map(foo => foo._id);
    const assessment = await Assessment.find({
        title:title,
        parentExam: ids,
        subject:subject
    }).populate("parentExam")

    res.json({
        success: true,
        assessment
})
}

export const showStudents = async (req, res) => {
    const { combined, subject } = req.body;
    const temp = combined.split(" - ");
    const Class = temp[0];
    const section = temp[1];
    const title = temp[2];
    const student = await Student.find({ Class: Class, section: section });

    if (!student || student.length == 0) {
        return res.json({
            success: false,
            message:"no student exists of this class"
        })
    }

    res.status(200).json({
        success: true,
        message: "Students fetched",
        student,
    })
}

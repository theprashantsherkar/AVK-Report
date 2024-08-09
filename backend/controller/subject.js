import { Subject } from "../model/subjects.js";

export const addSubject = async(req, res) => {
    const { sub } = req.body;
    const isAdded = await Subject.create({
        subject: sub,
    })

    if (!isAdded) {
        return res.status(500).json({
            success: false,
            message:"subject not added"
        })
    }

    res.status(200).json({
        success: true,
        message: "subject added successfully",
    })
}


export const getAllSubjects = async(req, res) => {
    const subjects = await Subject.find({})
    if (!subjects) {
        return res.status(404).json({
            success: false,
            message:"no subjects added yet"
        })
    }

    res.status(200).json({
        success: true,
        message: "subjects fetched successfully",
        subjects
    })
}



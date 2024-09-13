import { Subject } from "../model/subjects.js";
import mongoose from "mongoose";

export const addSubject = async (req, res) => {
    const { subject } = req.body;
    const isAdded = await Subject.create({
        subject: subject,
    })

    if (!isAdded) {
        return res.status(500).json({
            success: false,
            message: "subject not added"
        })
    }

    res.status(200).json({
        success: true,
        message: "subject added successfully",
    })
}


export const getAllSubjects = async (req, res) => {
    const subjects = await Subject.find({})
    if (!subjects) {
        return res.status(404).json({
            success: false,
            message: "no subjects added yet"
        })
    }

    res.status(200).json({
        success: true,
        message: "subjects fetched successfully",
        subjects
    })
}


export const removeSub = async (req, res) => {
    const id = req.params.id;
    const subject = await Subject.findById(id);
    await subject.deleteOne();
    res.status(200).json({
        success: true,
        message: "Subject Deleted successfully"
    })
}

export const updateSub = async (req, res) => {
    const { id } = req.params;
    const { subject } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid subject ID"
        });
    }

    try {
        const subjects = await Subject.findById(id);

        if (!subjects) {
            return res.status(404).json({
                success: false,
                message: "Subject not found"
            });
        }

        subjects.subject = subject;
        const isUpdated = await subjects.save();

        if (!isUpdated) {
            return res.status(500).json({
                success: false,
                message: "Subject didn't update, try again"
            });
        }

        res.status(200).json({
            success: true,
            message: "Subject Updated Successfully."
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
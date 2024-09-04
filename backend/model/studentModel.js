import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    Class: {
        type: String,
        required: true,

    },
    section: {
        type: String,
      required:true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    rollNo: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(Date.now()),
    },
    AdmissionNo: {
        type: String,
        required: true,
    },
    ContactNo: {
        type: Number,
        required: true,
    },
})


export const Student = mongoose.model('Students', studentSchema);
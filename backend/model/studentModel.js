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
    email: {
        type: String,
        required: true,
       unique:true
    },
    rollNo: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(Date.now()),
    }
})


export const Student = mongoose.model('Students', studentSchema);
import { Assessment } from "../model/assessmentModel.js";
import { Rubric } from "../model/rubric.js";


export const addRubrics = async (req, res) => {
    const { id } = req.params;
    const { rubric } = req.body;

    const assessment = await Assessment.findById(id);

    const newRubric = await Rubric.create({
        rubric: rubric,
        parentAssessment: id
    });
    
    
    if (!newRubric) {
        return res.status(500).json({
            success: false,
            message: "rubric not created"
        })
    }
    
    assessment.rubrics?.push(newRubric._id);
    await assessment.save();
    await newRubric.save();

    res.status(200).json({
        success: true,
        message: "rubrics created successfully",
        newRubric,
    })
}


export const editRubric = async (req, res) => {
    const id = req.params.id;
    const { newRubric } = req.body;

    let rubrics = await Rubric.findById(id);

    if (!newRubric) {
        return res.status(200).json({
            success: true,
            message: "nothing to update"
        })
    }
    else {
        rubrics.rubric = newRubric;
        await rubrics.save();
        return res.status(200).json({
            success: true,
            message: "rubric updated successfully",
            rubrics
        })
    }
}

export const getSpecificRubrics = async (req, res) => {
    const id = req.params.id;
    const rubrics = await Rubric.find({ parentAssessment: id }).populate("parentAssessment");
    if (!rubrics) {
        return res.status(404).json({
            success: false,
            message: "rubrics not added yet."
        })
    }

    res.status(200).json({
        success: true,
        message: "rubrics fetched",
        rubrics
    })
}

export const getAllRubrics = async (req, res) => {
    const allRubrics = await Rubric.find({}).populate("parentAssessment")
    if (!allRubrics) {
        return res.status(404).json({
            success: false,
            message: "no runrics found"
        })
    }
    return res.status(200).json({
        success: true,
        message: "Rubrics fetched",
        allRubrics,
    })

}


export const deleteRubric = async (req, res) => {
    const { id } = req.params;
    const rubric = await Rubric.findById(id);
    const isDeleted = await rubric.deleteOne();
    if (!isDeleted) {
        return res.status(500).json({
            success: false,
            message: "rubrics not deleted"
        })
    }

    res.status(200).json({
        success: true,
        message: "rubrics deleted successfully"
    })

}
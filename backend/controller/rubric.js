import { Rubric } from "../model/rubric.js";


export const addRubrics = async (req, res) => {
    const { rubric } = req.body;
    const { id } = req.params;
    const newRubric = await Rubric.create({
        rubric: rubric,
        parentAssessment: id
    });

    if (!newRubric) {
        return res.status(500).json({
            success: false,
            message:"rubric not created"
        })
    }
    res.status(200).json({
        success: true,
        message: "rubrics created successfully",
        newRubric,
    })
}


export const editRubric = async (req, res) => {
    const { id } = req.params;
    const { newRubric } = req.body;
    let rubrics = await Rubric.findById(id);

    newRubric ? rubrics.rubric = newRubric : rubrics.rubric;

    res.status(200).json({
        success: true,
        message:"rubrics updated successfully"
    
    })

}

export const getSpecificRubrics = async(req, res) => {
    const { id } = req.params;
    const rubrics = await Rubric.find({ parentAssessment: id });
    if (!rubrics) {
        return res.status(404).json({
            success: false,
            message:"rubrics not added yet."
        })
    }

    res.status(200).json({
        success: true,
        message: "rubrics fetched",
        rubrics
    })
}

export const getAllRubrics = async (req, res) => {
    const allRubrics = await Rubric.find({})
    if (!allRubrics) {
        return res.status(404).json({
            success: false,
            message:"no runrics found"
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
            message:"rubrics not deleted"
        })
    }

    res.status(200).json({
        success: true,
        message:"rubrics deleted successfully"
    })

}
import { User } from "../model/userModel.js"

export const getAllUsers =async (req, res) => {
    const users = await User.find({});
    if (!users) {
        return res.json({
            success: false,
            message:"no users found"
        })
    }

    res.status(200).json({
        success: true,
        message: "users found successfully",
        users
    })


}


//user Authentication apis


export const loginFunc = async(req, res) => {
    
}

export const signInFunc = async (req, res) => {

}

export const logoutFunc = async (req, res) => {

}
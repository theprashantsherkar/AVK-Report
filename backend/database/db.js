import mongoose, { mongo } from "mongoose";

export const DBconnect = () => {
    mongoose.connect('mongodb://localhost:27017/', 
        {
            dbName: "AVK"
        }).then(() => {
            console.log("database connected!")
        }).catch((err) => {
            console.log(`ERR: ${err}`)
        })
}
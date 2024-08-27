import mongoose from "mongoose";
import colors from 'colors';


export const DBconnect = () => {
    mongoose.connect('mongodb://localhost:27017/', {
        dbName: "AVK"
    })
        .then(() => {
            console.log("database connected!".black.bgCyan)
        })
        .catch((err) => {
            console.log(`ERR: ${err}`)
        })
}
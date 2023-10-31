import mongoose from "mongoose";

const url = "mongodb://localhost:27017/task"

export const connectDb = async () => {

    try {
        
        const conn = mongoose.connect(url, {useNewUrlParser : true})
        console.log("connect to db");

    } catch (error) {
        console.log("not connect to db");
    }
}
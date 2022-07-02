import mongoose from "mongoose";
import {config} from "../config.js";

const databaseURL = `mongodb+srv://${config.MONGO_USRNAME}:${config.MONGO_PWD}@${config.MONGO_CLUSTER}.biq7x.mongodb.net/?retryWrites=true&w=majority`;

export const connectDatabase = async () => {
    try {
        await mongoose.connect(databaseURL);
        console.log("Connected to the database");
    } catch (e) {
        console.log(e);
    }
}
import mongoose from "mongoose";
import {config} from "../config.js";

const databaseURL = `mongodb+srv://${config.MONGO_USRNAME}:${config.MONGO_PWD}@${config.MONGO_CLUSTER}.biq7x.mongodb.net/${config.MONGO_DB_NAME}?retryWrites=true&w=majority`;
export const connectDatabase =  (callbackFunc) => {
    mongoose.connect(databaseURL);
    console.log(databaseURL);
    mongoose.connection
        .once('open', () => {
            console.log('Connected to the database');
            callbackFunc();
        })
        .on('error', error => console.log(error));
}
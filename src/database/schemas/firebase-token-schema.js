import mongoose from "mongoose";

export const FirebaseTokenSchema = new mongoose.Schema({
    usrId: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    token: {
        type: mongoose.SchemaTypes.String,
        required: true,
    }
})
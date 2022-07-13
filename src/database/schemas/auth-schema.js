import mongoose from "mongoose";

export const AuthSchema = new mongoose.Schema({
    usrName: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    pwd: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    type: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    usrId: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
});
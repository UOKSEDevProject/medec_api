import mongoose from "mongoose";

export const DoctorSchema = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    cntNo: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    spec: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    prfImgUrl: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    sex: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
});
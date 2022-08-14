import mongoose from "mongoose";

export const LabReportSchema = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    lId: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    pId: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    imgPath: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    date: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    address: {
        type: mongoose.SchemaTypes.String,
        required: true,
    }
});
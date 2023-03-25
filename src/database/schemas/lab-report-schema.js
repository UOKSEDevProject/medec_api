import mongoose from "mongoose";

export const LabReportSchema = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    lId: {
        type: mongoose.SchemaTypes.String,
    },
    pId: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    imgPath: {
        type: mongoose.SchemaTypes.String,
    },
    date: {
        type: mongoose.SchemaTypes.Date,
    },
    status: {
        type: mongoose.SchemaTypes.String,
        required: true,
    }
});
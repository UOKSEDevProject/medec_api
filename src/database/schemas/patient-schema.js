import mongoose from "mongoose";

const MediHistorySchema = new mongoose.Schema({
    date: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    dct: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    imgPath: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
});

export const PatientSchema = new mongoose.Schema({
    fullName: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    disName: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    nameWithInitials: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    prfImgUrl: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    address: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    birthDate: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    bldGrp: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    des: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    sex: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    cntNo: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    mediHis: [MediHistorySchema],
});
import mongoose from "mongoose";

const MediHistorySchema =new mongoose.Schema({
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
        required: true,
    },
    disName: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    nameWithInitials: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    prfImgUrl: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    address: {
        type: mongoose.SchemaTypes.String,
        required: true,
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
        required: true,
    },
    sex: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    cntNo: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    mediHis: [
        {
            type: MediHistorySchema,
        },
    ],
});
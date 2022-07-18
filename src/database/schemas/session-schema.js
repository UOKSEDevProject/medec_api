import mongoose from "mongoose";

const AptsSchema = new mongoose.Schema({
    aptNo: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    pId: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    pName: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    activeSt: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
});

export const SessionSchema = new mongoose.Schema({
    dctId: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    chId: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    strTime: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    date: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    maxApts: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    totApts: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    curAptNo: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    apts: {
        type: [AptsSchema],
        required: true
    }
});
import mongoose from "mongoose";

export const ChanCenterSchema = new mongoose.Schema({
    address: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    name: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    cntNo: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    logoUrl: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
});
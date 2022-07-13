import mongoose from "mongoose";
import {LabSchema} from "../schemas/lab-schema.js";

const collectionName = 'labs';

export const LabModel = mongoose.model(collectionName, LabSchema);
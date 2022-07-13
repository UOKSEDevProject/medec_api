import mongoose from "mongoose";
import {PatientSchema} from "../schemas/patient-schema.js";

const collectionName = 'patients';

export const PatientModel = mongoose.model(collectionName, PatientSchema);
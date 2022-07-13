import mongoose from "mongoose";
import {LabReportSchema} from "../schemas/lab-report-schema.js";

const collectionName = 'lab_reports';

export const LabReportModel = mongoose.model(collectionName, LabReportSchema);
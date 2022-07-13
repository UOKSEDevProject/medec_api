import mongoose from "mongoose";
import {DoctorSchema} from "../schemas/doctor-schema.js";

const collectionName = 'doctors';

export const DoctorModel = mongoose.model(collectionName, DoctorSchema);
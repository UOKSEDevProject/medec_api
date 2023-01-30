import {PatientModel} from "../database/models/patient-model.js";

export const findPatientById = async (id) => {
    return await PatientModel.findById(id);
}
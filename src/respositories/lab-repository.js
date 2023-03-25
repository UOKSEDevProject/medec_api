import {LabModel} from "../database/models/lab-model.js";

export const findLaboratoryById = async (id) => {
    return await LabModel.findById(id);
}
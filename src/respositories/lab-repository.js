import {LabModel} from "../database/models/lab-model.js";

export const findLaboratoryById = async (id) => {
    try {
        return await LabModel.findById(id);
    } catch (err) {
        throw err;
    }
}
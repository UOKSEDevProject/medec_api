import {LabReportModel} from "../database/models/lab-report-model.js";

export const findLabReportsByPatientId = async (pId) => {
    return await LabReportModel.find({pId: pId}).sort({date: 1});
}
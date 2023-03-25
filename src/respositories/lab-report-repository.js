import {LabReportModel} from "../database/models/lab-report-model.js";
import {labReportStatus} from "../constants.js";

export const findLabReportsByPatientId = async (pId) => {
    return await LabReportModel.find({pId: pId}).sort({date: 1});
}

export const addLabReport = async (labReport) => {
    return await LabReportModel.create(labReport);
}

export const getLabReportRequirementListByStatusAndPatientId = async (pId) => {
    return await LabReportModel.find({pId: pId, status: labReportStatus.PENDING});
}
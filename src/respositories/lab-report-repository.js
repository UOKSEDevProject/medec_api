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

export const getPatientListForLaboratory = async (lId) => {
    let pipeline = [
        {
            $match: {
                lId: lId
            }
        },
        {
            $group: {
                _id: "$pId", labReports: {
                    $push: {
                        id: "$_id",
                        name: "$name",
                        status: "$status"
                    }
                }
            }
        },
        {
            $addFields: {
                _id: {
                    $toObjectId: "$_id",
                }
            }
        },
        {
            $lookup: {
                from: "patients",
                localField: "_id",
                foreignField: "_id",
                as: "patient",
            }
        },
        {
            $set: {
                patient: {
                    $arrayElemAt: ["$patient", 0],
                },
            }
        },
        {
            $project: {
                _id: 1,
                name: "$patient.disName",
                gender: "$patient.sex",
                birthDate: "$patient.birthDate",
                tp: "$patient.cntNo",
                profilePicture: "$patient.prfImgUrl",
                reportList: "$labReports"
            }
        }
    ]
    return await LabReportModel.aggregate(pipeline);
}

export const updateLabReportsOnRequested = async (pId, lId, reqList) => {
    await LabReportModel.updateMany(
        {
            _id: {$in: reqList},
            pId: pId
        },
        {
            $set: {
                lId: lId,
                status: labReportStatus.REQUESTED
            }
        }
    );
}

export const getLabReportsListInConfirmList = async (pId, lId, confList) => {
    return await LabReportModel.find(
        {
            _id: {$in: confList},
            pId: pId
        }
    );
}

export const saveLabReportAfterCompletion = async (id, imgUrl) => {
    await LabReportModel.findOneAndUpdate(
        {
            _id: id
        },
        {
            $set: {
                imgPath: imgUrl,
                status: labReportStatus.COMPLETED,
            }
        }
    );
}

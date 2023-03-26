import {LabReportModel} from "../database/models/lab-report-model.js";
import {labReportStatus} from "../constants.js";

export const findLabReportsByPatientId = async (pId) => {
    try {
        return await LabReportModel.find({pId: pId}).sort({date: 1});
    } catch (err) {
        throw err;
    }
}

export const addLabReport = async (labReport) => {
    try {
        return await LabReportModel.create(labReport);
    } catch (err) {
        throw err;
    }
}

export const getLabReportRequirementListByStatusAndPatientId = async (pId) => {
    try {
        return await LabReportModel.find({pId: pId, status: labReportStatus.PENDING});
    } catch (err) {
        throw err;
    }
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

    try {
        return await LabReportModel.aggregate(pipeline);
    } catch (err) {
        throw err;
    }
}

export const updateLabReportsOnRequested = async (pId, lId, reqList) => {
    try {
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
    } catch (err) {
        throw err;
    }
}

export const updateLabReportStatusOnCompletion = async (id, imgUrl) => {
    try {
        return await LabReportModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    imgPath: imgUrl,
                    status: labReportStatus.COMPLETED
                }
            }
        );
    } catch (err) {
        throw err;
    }
}

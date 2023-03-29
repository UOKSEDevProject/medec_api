import {PatientModel} from "../database/models/patient-model.js";
import {SessionModel} from "../database/models/session-model.js";

export const findPatientById = async (id) => {
    try {
        return await PatientModel.findById(id);
    } catch (err) {
        throw err;
    }
}

export const findPatientMediHistoryById = async (id) => {
    try {
        return await PatientModel.aggregate([
            {
                $addFields: {
                    _id: {
                        $toString: "$_id"
                    },
                }
            },
            {
                $match: {
                    _id: id
                }
            },
            {
                $unwind: "$mediHis"
            },
            {
                $project: {
                    _id: 0,
                    id: "$mediHis._id",
                    dct: "$mediHis.dct",
                    date: "$mediHis.date",
                    imgPath: "$mediHis.imgPath"
                }
            },
            {
                $lookup: {
                    from: "doctors",
                    localField: "dct",
                    foreignField: "_id",
                    as: "doctor"
                }
            },
            {
                $set: {
                    doctor: {$arrayElemAt: ["$doctor", 0],}
                }
            },
            {
                $project: {
                    _id: "$id",
                    date: "$date",
                    imgPath: "$imgPath",
                    name: "$doctor.disName"
                }
            }
        ]);
    } catch (err) {
        throw err;
    }
}

export const getAppointments = async (id) => {
    try {
        return await SessionModel.aggregate([
            {
                $unwind: "$apts"
            },
            {
                $match: {
                    "apts.pId": id
                }
            },
            {
                $addFields: {
                    chId: {
                        $toObjectId: "$chId"
                    },
                }
            },
            {
                $lookup: {
                    from: "doctors",
                    localField: "dctId",
                    foreignField: "_id",
                    as: "doctor"
                }
            },
            {
                $lookup: {
                    from: "chan_centers",
                    localField: "chId",
                    foreignField: "_id",
                    as: "channelCenter"
                }
            },
            {
                $set: {
                    doctor: {$arrayElemAt: ["$doctor", 0],},
                    channelCenter: {$arrayElemAt: ["$channelCenter", 0],}
                }
            },
            {
                $project: {
                    _id: 1,
                    channelCenter: "$channelCenter.name",
                    dctName: "$doctor.disName",
                    date: 1,
                    time: "$strTime",
                    aptNo: "$apts.aptNo",
                    refNo: {$toString: "$apts._id",},
                    currAptNo: "$curAptNo"
                }
            },
            {
                $sort: {
                    date: 1,
                    time: 1,
                }
            },
        ]);
    } catch (err) {
        throw err;
    }
}

export const addToMedicalHistory = async (pId, doctorRecommendation) => {
    try {
        return await PatientModel.findOneAndUpdate(
            {_id: pId},
            {
                $push: {
                    mediHis: doctorRecommendation,
                }
            },
            {
                new: true,
                rawResult: true,
            }
        )
    } catch (err) {
        throw err;
    }
}

export const findPatientByIdAndReplace = async (pId, patient) => {
    try {
        return await PatientModel.findOneAndReplace({_id: pId}, patient);
    } catch (err) {
        throw err;
    }
}
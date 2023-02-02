import {PatientModel} from "../database/models/patient-model.js";
import {SessionModel} from "../database/models/session-model.js";

export const findPatientById = async (id) => {
    return await PatientModel.findById(id);
}

export const getAppointments = async (id) => {
    return await SessionModel.aggregate([
        {
            $unwind: "$apts"
        },
        {
            $match: {
                "apts.pId": args.id
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
                _id: 0,
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
}
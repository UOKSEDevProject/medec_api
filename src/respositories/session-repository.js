import {SessionModel} from "../database/models/session-model.js";
import {sessionStatus} from "../constants.js";

export const findSessionById = async (id) => {
    try {
        return await SessionModel.findById(id);
    } catch (err) {
        throw err;
    }
}

export const addAppointmentToSession = async (sessionId, appointment) => {
    try {
        return await SessionModel.findOneAndUpdate(
            {_id: sessionId},
            {
                $push: {
                    apts: appointment,
                },
                $inc: {
                    totApts: 1
                }
            },
            {
                new: true,
                rawResult: true,
            }
        );
    } catch (err) {
        throw err;
    }

}

export const checkWhetherAlreadyHaveAppointmentForGivenUser = async (sessionId, pId) => {
    try {
        let results = await SessionModel.aggregate([
            {
                $addFields: {
                    _id: {
                        $toString: "$_id"
                    },
                }
            },
            {
                $match: {
                    _id: sessionId,
                },
            },
            {
                $unwind: '$apts',
            },
            {
                $match: {
                    'apts.pId': pId,
                }
            }
        ]);
        return results.length > 0;
    } catch (err) {
        throw err;
    }
}

export const getAppointmentList = async (sessionId) => {
    let pipeline = [
        {
            $addFields: {
                _id: {
                    $toString: "$_id"
                },
            }
        },
        {
            $match: {
                _id: sessionId,
            }
        },
        {
            $unwind: "$apts"
        },
        {
            $project: {
                aptId: "$apts._id",
                pId: "$apts.pId"
            }
        },
        {
            $addFields: {
                pId: {
                    $toObjectId: "$pId"
                },
            }
        },
        {
            $lookup: {
                from: "patients",
                localField: "pId",
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
                aptId: "$aptId",
                _id: "$patient._id",
                name: "$patient.disName",
                cntNo: "$patient.cntNo",
                bloodGroup: "$patient.bldGrp",
                birthDate: "$patient.birthDate",
                address: "$patient.address",
                description: "$patient.des",
                prfImgUrl: "$patient.prfImgUrl"
            }
        }
    ]

    try {
        return await SessionModel.aggregate(pipeline);
    } catch (err) {
        throw err;
    }
}

export const updateSession = async (sessionId, status, curAptNo, aptId) => {
    try {
        return await SessionModel.findOneAndUpdate(
            {
                _id: sessionId,
                "apts._id": aptId
            },
            {
                status: status,
                curAptNo: curAptNo,
                $set: {
                    "apts.$.activeSt": sessionStatus.FINISHED,
                },
            },
            {
                new: true,
                rawResult: true
            }
        );
    } catch (err) {
        throw err;
    }
}

export const getAllTokensForAllUsrIdsInSession = async (sessionId) => {
    let pipeline = [
        {
            $addFields: {
                _id: {
                    $toString: "$_id"
                },
            }
        },
        {
            $match: {
                _id: sessionId,
            }
        },
        {
            $unwind: "$apts"
        },
        {
            $project: {
                chId: 1,
                dctId: 1,
                pId: "$apts.pId"
            }
        },
        {
            $lookup: {
                from: "fcms",
                localField: "pId",
                foreignField: "usrId",
                pipeline: [
                    {
                        $project: {
                            _id: 0,
                            token: 1
                        }
                    }
                ],
                as: "token",
            }
        },
        {
            $set: {
                token: {
                    $arrayElemAt: ["$token", 0],
                },
            }
        },
        {
            $lookup: {
                from: "doctors",
                localField: "dctId",
                foreignField: "_id",
                pipeline: [
                    {
                        $project: {
                            _id: 0,
                            disName: 1
                        }
                    }
                ],
                as: "doctor",
            }
        },
        {
            $set: {
                dct: {
                    $arrayElemAt: ["$doctor", 0],
                },
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
                from: "chan_centers",
                localField: "chId",
                foreignField: "_id",
                pipeline: [
                    {
                        $project: {
                            _id: 0,
                            name: 1
                        }
                    }
                ],
                as: "chan_center",
            }
        },
        {
            $set: {
                ch: {
                    $arrayElemAt: ["$chan_center", 0],
                },
            }
        },
        {
            $project: {
                _id: 0,
                token: "$token.token",
                dct_name: "$dct.disName",
                ch_name: "$ch.name"
            }
        }
    ]

    try {
        return await SessionModel.aggregate(pipeline);
    } catch (err) {
        throw err;
    }
}
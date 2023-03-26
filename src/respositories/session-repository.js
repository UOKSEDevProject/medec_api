import {SessionModel} from "../database/models/session-model.js";

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

export const getAppointmentsList = async (sessionId) => {
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
                _id: 0,
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
                _id: "$patient._id",
                disName: "$patient.disName",
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
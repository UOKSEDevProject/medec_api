import {SessionModel} from "../database/models/session-model.js";

export const findSessionById = async (id) => {
    return await SessionModel.findById(id);
}

export const addAppointmentToSession = async (sessionId, appointment) => {
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
}

export const checkWhetherAlreadyHaveAppointmentForGivenUser = async (sessionId, pId) => {
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
}
import {ChanCenterModel} from "../database/models/chan-center-model.js";

export const updateDoctorsArray = async (chId, dcId) => {
    return await ChanCenterModel.findOneAndUpdate(
        {_id: chId},
        {
            $push: {
                doctors: dcId,
            }
        },
        {
            new: true,
            rawResult: true,
        }
    );
}

export const findChanCenterById = async (chId) => {
    return await ChanCenterModel.findById(chId);
}
import {ChanCenterModel} from "../database/models/chan-center-model.js";

export const updateDoctorsArray = async (chId, dcId) => {
    try {
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
    } catch (err) {
        throw err;
    }

}

export const findChanCenterById = async (chId) => {
    try {
        return await ChanCenterModel.findById(chId);
    } catch (err) {
        throw err;
    }
}
import {ChanCenterModel} from "../database/models/chan-center-model.js";

export const updateDoctorsArray = async (chId, dcId) => {
    let updated = await ChanCenterModel.findOneAndUpdate(
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
    )

    return updated;
}

export const findChanCenterById = async (chId) => {
    return ChanCenterModel.findById(chId);
}
import {FirebaseTokenModel} from "../database/models/firebase-token-model.js";

export const findFcmByUsrId = async (usrId) => {
    try {
        return await FirebaseTokenModel.find({usrId: usrId});
    } catch (err) {
        throw err;
    }
}

export const addFcmToken = async (usrId, token) => {
    try {
        let fcm = {
            usrId: usrId,
            token: token
        }
        await FirebaseTokenModel.create(fcm);
    } catch (err) {
        throw err;
    }
}

export const updateFcmToken = async (usrId, token) => {
    console.log(usrId, token);
    try {
        await FirebaseTokenModel.findOneAndUpdate(
            {usrId: usrId},
            {
                token: token
            }
        )
    } catch (err) {
        throw err;
    }
}
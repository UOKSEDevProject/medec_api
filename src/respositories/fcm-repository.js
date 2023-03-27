import {FirebaseTokenModel} from "../database/models/firebase-token-model.js";

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
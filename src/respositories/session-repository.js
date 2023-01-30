import {SessionModel} from "../database/models/session-model.js";

export const findSessionById = async (id) => {
    return await SessionModel.findById(id);
}
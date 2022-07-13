import {SessionModel} from "../../database/models/session-model.js";

export const sessionResolver = {
    Query: {
        getSessions: async (_,args) => {
            let sessions = await SessionModel.find();
            return sessions;
        }
    },

    Mutation: {

    }
}
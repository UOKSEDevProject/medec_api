import {SessionModel} from "../../database/models/session-model.js";
import {apolloServerConnection} from "../../apollo-server-connection.js";

export const sessionResolver = {
    Query: {
        getSessions: async (_, args) => {
            let sessions = await SessionModel.find();
            return sessions;
        }
    },

    Mutation: {
        updateSession: async (_, args) => {
            let findSession = await  SessionModel.findById(args.sessionId);
            findSession.totApts = Math.floor(Math.random() * 10);
            apolloServerConnection.pubsub.publish("SESSION_LISTENER", {sessionListener: findSession});
            return findSession;
        }
    },

    Subscription: {
        sessionListener: {
            subscribe: () => apolloServerConnection.pubsub.asyncIterator(["SESSION_LISTENER"]),
        }
    }
}


// [Ovindu]
// https://www.apollographql.com/docs/apollo-server/data/subscriptions/#subscriptions-with-additional-middleware
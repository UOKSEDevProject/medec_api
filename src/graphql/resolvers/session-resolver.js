import {SessionModel} from "../../database/models/session-model.js";
import {apolloServerConnection} from "../../apollo-server-connection.js";
import {withFilter} from "graphql-subscriptions";

let changeStream = undefined;
let pipeline = undefined;

let createListerCallback = (data) => {
    apolloServerConnection.pubsub.publish("SESSION_LISTENER", data.fullDocument);
};

let startCollectionListener = () => {
    pipeline = [{'$match': {'operationType': 'update'}}];

    if (!changeStream) {
        changeStream = SessionModel.watch(pipeline, {fullDocument: 'updateLookup'}).on('change', createListerCallback);
    }
};

export const sessionResolver = {
    Query: {
        getSessions: async (_, args) => {
            let sessions = await SessionModel.find();
            return sessions;
        }
    },

    Mutation: {
        updateSession: async (_, args) => {
            let updatedSession = await SessionModel.findByIdAndUpdate(args.sessionId, args.session, {new: true});

            return updatedSession;
        },

        createSession: async (_, args) => {
            let session = await SessionModel.create({
                dctId: args.session.dctId,
                chId: args.session.chId,
                strTime: args.session.strTime,
                date: args.session.date,
                maxApts: args.session.maxApts,
                totApts: args.session.totApts,
                curAptNo: args.session.curAptNo,
                apts: args.session.apts
            });

            return session;
        }
    },

    Subscription: {
        sessionListener: {
            resolve: (payload) => {
                return payload
            },

            subscribe: withFilter(
                () => {
                    startCollectionListener();
                    return apolloServerConnection.pubsub.asyncIterator(["SESSION_LISTENER"]);
                },
                (payload, args) => {
                    return args.sessionId === payload._id.valueOf();
                }
            )
        }
    }
}
import {SessionModel} from "../../database/models/session-model.js";
import {apolloServerConnection} from "../../apollo-server-connection.js";
import {withFilter} from "graphql-subscriptions";
import {sessionStatus, statusCodes} from "../../constants.js";
import {DoctorModel} from "../../database/models/doctor-model.js";
import {ChanCenterModel} from "../../database/models/chan-center-model.js";

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

let response = {
    statusCode: null,
    statusDetails: null,
    payload: null
};

export const sessionResolver = {
    Query: {
        getSessions: async (_, args) => {
            let sessions = await SessionModel.find();
            return sessions;
        }
    },

    Mutation: {
        createSession: async (_, args) => {
            let doctor = await DoctorModel.findById(args.session.dctId);
            let channelCenter = await ChanCenterModel.findById(args.session.chId);

            if (doctor === null || channelCenter === null) {
                response.statusCode = statusCodes.OnNotFound.code;
                response.statusDetails = statusCodes.OnNotFound.details;
                response.payload = null;
                return response;
            }

            let sessions = await SessionModel.find({
                dctId: args.session.dctId,
                date: args.session.date,
                strTime: args.session.strTime
            });

            if (sessions.length !== 0) {
                response.statusCode = statusCodes.OnConflict.code;
                response.statusDetails = statusCodes.OnConflict.details;
                response.payload = sessions[0];
                return response;
            }

            const status = sessionStatus.NOT_STARTED;
            const totApts = 0;
            const apts = [];
            const curAptNo = 0;

            let createdSession = await SessionModel.create({
                dctId: args.session.dctId,
                chId: args.session.chId,
                strTime: args.session.strTime,
                date: args.session.date,
                maxApts: args.session.maxApts,
                totApts: totApts,
                curAptNo: curAptNo,
                apts: apts,
                status: status,
            });

            response.statusCode = statusCodes.Onsuccess.code;
            response.statusDetails = statusCodes.Onsuccess.details;
            response.payload = createdSession;
            return response;
        },

        updateSession: async (_, args) => {
            let updatedSession = await SessionModel.findByIdAndUpdate(args.sessionId, args.session, {new: true});

            if (updatedSession === null) {
                response.statusCode = statusCodes.OnNotFound.code;
                response.statusDetails = statusCodes.OnNotFound.details;
                response.payload = null;
            } else {
                response.statusCode = statusCodes.Onsuccess.code;
                response.statusDetails = statusCodes.Onsuccess.details;
                response.payload = updatedSession;
            }

            return response;
        },

        deleteSession: async (_, args) => {
            let session = await SessionModel.findOneAndDelete({_id: args.sessionId},);

            if (session === null) {
                response.statusCode = statusCodes.OnNotFound.code;
                response.statusDetails = statusCodes.OnNotFound.details;
                response.payload = null;
            } else {
                response.statusCode = statusCodes.Onsuccess.code;
                response.statusDetails = statusCodes.Onsuccess.details;
                response.payload = null;
            }

            return response;
        },

        addAppointment: async (_, args) => {
            let appointment = {
                pId: args.aptArgs.pId,
                pName: args.aptArgs.pName,
                activeSt: args.aptArgs.activeSt,
                aptNo: args.aptArgs.aptNo
            }

            let updated = await SessionModel.findOneAndUpdate(
                {_id: args.sessionId},
                {
                    $push: {
                        apts: appointment,
                    }
                },
                {
                    new: true,
                    rawResult: true,
                }
            )

            return updated.value;
        },

        updateAptSts: async (_, args) => {
            let updated = await SessionModel.findOneAndUpdate(
                {
                    _id: args.sessionId,
                    "apts._id": args.aptId
                },
                {
                    $set: {
                        "apts.$.activeSt": args.sts,
                    },
                    $inc: {curAptNo: 1}
                },
                {
                    new: true,
                    rawResult: true
                }
            )

            return updated.value;
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
                    let ids = args && args.sessionId ? args.sessionId.split('|') : [];
                    let isMatched = false;

                    ids.map((id) => {
                        if (id === payload._id.valueOf()) {
                            isMatched = true;
                        }
                    });

                    return isMatched;
                }
            )
        }
    }
}
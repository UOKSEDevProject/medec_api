import {SessionModel} from "../../database/models/session-model.js";
import {PatientModel} from "../../database/models/patient-model.js";

export const patientResolver = {
    Query: {
        getPatients: async () => {
            let patients = await PatientModel.find();
            return patients;
        },

        getAppointments: async (_, args) => {
            let pipeline = [
                {
                    $unwind: "$apts"
                },
                {
                    $match: {
                        "apts.pId": args.id
                    }
                },
                {
                    $addFields: {
                        chId: {
                            $toObjectId: "$chId"
                        },
                    }
                },
                {
                    $lookup: {
                        from: "doctors",
                        localField: "dctId",
                        foreignField: "_id",
                        as: "doctor"
                    }
                },
                {
                    $lookup: {
                        from: "chan_centers",
                        localField: "chId",
                        foreignField: "_id",
                        as: "channelCenter"
                    }
                },
                {
                    $set: {
                        doctor: {$arrayElemAt: ["$doctor", 0],},
                        channelCenter: {$arrayElemAt: ["$channelCenter", 0],}
                    }
                },
                {
                    $project: {
                        _id: 0,
                        channelCenter: "$channelCenter.name",
                        dctName: "$doctor.disName",
                        date: 1,
                        time: "$strTime",
                        aptNo: "$apts.aptNo",
                        refNo: {$toString: "$apts._id",},
                        currAptNo: "$curAptNo"
                    }
                },
                {
                    $sort: {
                        date: 1,
                        time: 1,
                    }
                },
            ]

            let appointments = await SessionModel.aggregate(pipeline);

            return appointments;
        }
    },

    Mutation: {
        addPatient: async (_, args) => {
            let patient = {
                fullName: args.patient.fullName,
                disName: args.patient.disName,
                nameWithInitials: args.patient.nameWithInitials,
                prfImgUrl: args.patient.prfImgUrl,
                address: args.patient.address,
                birthDate: args.patient.birthDate,
                bldGrp: args.patient.bldGrp,
                des: args.patient.des,
                sex: args.patient.sex,
                cntNo: args.patient.cntNo,
            }

            let created = await PatientModel.create(patient);

            return created;
        },

    }
}
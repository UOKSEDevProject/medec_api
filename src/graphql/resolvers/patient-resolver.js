import {SessionModel} from "../../database/models/session-model.js";
import {PatientModel} from "../../database/models/patient-model.js";
import {findPatientById} from "../../respositories/patient-repository.js";
import {statusCodes} from "../../constants.js";
import {findLabReportsByPatientId} from "../../respositories/lab-report-repository.js";
import {groupLabReportsByMonth} from "../../utils/lab-report-utils.js";

let response = {
    statusCode: null,
    statusDetails: null,
    payload: null
};

export const patientResolver = {
    Query: {
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
        },

        getReportList: async (_, args) => {
            let patient = await findPatientById(args.pId);

            if (patient === null) {
                response.statusCode = statusCodes.OnNotFound.code;
                response.statusDetails = statusCodes.OnNotFound.details;
                response.payload = null;
                return response;
            }

            let reports = await findLabReportsByPatientId(args.pId);

            console.log(reports);

            groupLabReportsByMonth(reports);
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
import {DoctorModel} from "../../database/models/doctor-model.js";
import {SessionModel} from "../../database/models/session-model.js";

export const doctorResolver = {
    Query: {
        getDoctors: async () => {
            let doctors = await DoctorModel.find();
            return doctors;
        },
        getAvailableDoctors: async () => {
            let availableDoctors = await SessionModel.aggregate([
                {
                    $match: {
                        status: "active"
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
                        doctor: {$arrayElemAt: ["$doctor", 0]},
                        channelCenter: {$arrayElemAt: ["$channelCenter", 0]}
                    }
                },
                {
                    $project: {
                        _id: "$doctor._id",
                        disName: "$doctor.disName",
                        mediCenter: "$channelCenter.name",
                        specialization: "$doctor.spec",
                        status: "$status",
                        imageSrc: "$doctor.prfImgUrl",
                    }
                }
            ])
            return availableDoctors;
        },
        getDoctorById: async (_, args) => {
            let doctor = await DoctorModel.findById(args.id);
            return doctor;
        },
        searchDoctors: async (_, args) => {
            let doctors;
            if (args.category === undefined) {
                doctors = await DoctorModel.find({
                    disName: {
                        $regex: new RegExp(`${args.searchValue}`),
                        $options: 'i'
                    }
                })
            } else {
                doctors = await DoctorModel.find({
                    disName: {$regex: new RegExp(`${args.searchValue}`), $options: 'i'},
                    spec: args.category
                },)
            }
            return doctors;
        },
        getDoctorSessionList: async (_, args) => {
            let doctor = await DoctorModel.findOne({_id: args.id});
            let sessions = await SessionModel.aggregate([
                {
                    $match: {
                        dctId: args.id,
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
                        from: "chan_centers",
                        localField: "chId",
                        foreignField: "_id",
                        as: "channelCenter"
                    }
                },
                {
                    $sort: {
                        strTime: 1,
                        date: 1,
                    }
                },
                {
                    $group: {
                        _id: "$channelCenter.name",
                        sessionsList: {
                            $push: {
                                time: "$strTime",
                                date: "$date",
                                appointments: "$totApts",
                                maximumAppointments: "$maxApts",
                            }
                        }
                    },
                },
                {
                    $set: {
                        hospitalName: {$arrayElemAt: ["$_id", 0]},
                    }
                },
                {
                    $project:{
                        _id:0,
                    }
                }
            ])
            let res = null;
            if(doctor !== null){
                res = {
                    _id:doctor._id,
                    disName: doctor.disName,
                    spec: doctor.spec,
                    prfImgUrl: doctor.prfImgUrl,
                    sessions: sessions,
                }
            }
            return res;
        }
    },

    Mutation: {
        addDoctor: async (_, args) => {
            let doctor = {
                _id: args.doctor._id,
                fullName: args.doctor.fullName,
                disName: args.doctor.disName,
                nameWithInitials: args.doctor.nameWithInitials,
                cntNo: args.doctor.cntNo,
                address: args.doctor.address,
                spec: args.doctor.spec,
                prfImgUrl: args.doctor.prfImgUrl,
                email: args.doctor.email,
                sex: args.doctor.sex,
            }

            let created = await DoctorModel.create(doctor);
            return created;
        }
    }
}
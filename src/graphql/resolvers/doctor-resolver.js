import {DoctorModel} from "../../database/models/doctor-model.js";
import {SessionModel} from "../../database/models/session-model.js";

export const doctorResolver = {
    Query: {
        getDoctorById: async (_, args) => {
            let doctor = await DoctorModel.findById(args.id);
            return doctor;
        },

        getDoctors: async (_, args) => {
            let doctors;

            //Pipelines to later be added to aggregate function based on conditions
            let pipeline = [{
                $lookup: {
                    from: "sessions", localField: "_id", foreignField: "dctId", pipeline: [{
                        $match: {
                            $expr: {
                                $and: [{$eq: ["$status", "active"]}]
                            }
                        }
                    }], as: "session",
                }
            }, {
                $addFields: {
                    status: {
                        $cond: {
                            if: {$eq: ["$session", []]}, then: false, else: true,
                        }
                    },
                }
            }, {
                $set: {
                    session: {$arrayElemAt: ["$session", 0]}
                }
            }, {
                $addFields: {
                    chId: {
                        $toObjectId: "$session.chId"
                    },
                }
            }, {
                $lookup: {
                    from: "chan_centers", localField: "chId", foreignField: "_id", as: "channelCenter",
                }
            }, {
                $set: {
                    channelCenter: {$arrayElemAt: ["$channelCenter", 0]}
                }
            }, {
                $project: {
                    _id: "$_id",
                    disName: "$disName",
                    specialization: "$spec",
                    status: "$status",
                    imageSrc: "$prfImgUrl",
                    mediCenter: {
                        $cond: {
                            if: {$eq: ["$status", true]}, then: "$channelCenter.name", else: null,
                        }
                    }
                }
            }];
            let searchValueFilter = {
                $match: {
                    disName: {
                        $regex: new RegExp(`${args.searchValue}`), $options: 'i'
                    }
                },
            };
            let categoryFilter = {
                $match: {
                    specialization: args.category
                },
            }

            if (args.searchValue === undefined && args.category === undefined) {
                doctors = await DoctorModel.aggregate(pipeline);
            } else if (args.searchValue === undefined) {
                doctors = await DoctorModel.aggregate([...pipeline, categoryFilter]);
            } else if (args.category === undefined) {
                doctors = await DoctorModel.aggregate([...pipeline, searchValueFilter]);
            } else {
                doctors = await DoctorModel.aggregate([...pipeline, searchValueFilter, categoryFilter]);
            }

            return doctors;
        },

        getDoctorSessionList: async (_, args) => {
            let pipeline = [{
                $match: {
                    _id: args.id,
                }
            }, {
                $project: {
                    disName: 1, spec: 1, prfImgUrl: 1,
                }
            }, {
                $lookup: {
                    from: "sessions", localField: "_id", foreignField: "dctId", pipeline: [{
                        $sort: {
                            date: 1, strTime: 1,
                        }
                    }, {
                        $group: {
                            _id: "$chId", sessionsList: {
                                $push: {
                                    time: "$strTime",
                                    date: "$date",
                                    appointments: "$totApts",
                                    maximumAppointments: "$maxApts",
                                }
                            }
                        },
                    }, {
                        $addFields: {
                            _id: {
                                $toObjectId: "$_id",
                            }
                        }
                    }, {
                        $lookup: {
                            from: "chan_centers", localField: "_id", foreignField: "_id", pipeline: [{
                                $project: {
                                    _id: 0, name: 1,
                                }
                            },], as: "hospitalName",
                        }
                    }, {
                        $set: {
                            hospitalName: {
                                $arrayElemAt: ["$hospitalName", 0],
                            },
                        }
                    }, {
                        $set: {
                            hospitalName: "$hospitalName.name"
                        }
                    }], as: "channelCenters"
                }
            }];

            let doctor = await DoctorModel.aggregate(pipeline);

            return doctor[0];
        },

        getDoctorSessionListForChannelCenter: async (_, args) => {
            let pipeline = [
                {
                    $match: {
                        _id: args.id,
                    }
                },
                {
                    $lookup: {
                        from: "sessions",
                        localField: "_id",
                        foreignField: "dctId",
                        pipeline: [
                            {
                                $match: {
                                    chId: args.chId,
                                },
                            },
                            {
                                $project: {
                                    time: "$strTime",
                                    date: "$date",
                                    appointments: "$totApts",
                                    maximumAppointments: "$maxApts",
                                }
                            },
                            {
                                $sort: {
                                    strTime: 1,
                                }
                            },
                        ],
                        as: "sessionsList",
                    }
                },
                {
                    $project: {
                        disName: 1,
                        spec: 1,
                        prfImgUrl: 1,
                        sessionsList: 1,
                    }
                }
            ]

            let sessionList = await DoctorModel.aggregate(pipeline);

            return sessionList[0];
        },

        getAvailableDoctors: async (_, args) => {
            let availableDoctors;

            let pipeline = [
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
                        from: "doctors", localField: "dctId", foreignField: "_id", as: "doctor"
                    }
                },
                {
                    $lookup: {
                        from: "chan_centers", localField: "chId", foreignField: "_id", as: "channelCenter"
                    }
                },
                {
                    $set: {
                        doctor: {$arrayElemAt: ["$doctor", 0]}, channelCenter: {$arrayElemAt: ["$channelCenter", 0]}
                    }
                },
                {
                    $project: {
                        _id: "$doctor._id",
                        disName: "$doctor.disName",
                        mediCenter: "$channelCenter.name",
                        specialization: "$doctor.spec",
                        imageSrc: "$doctor.prfImgUrl",
                    }
                },
            ];
            let searchValueFilter = {
                $match: {
                    disName: {
                        $regex: new RegExp(`${args.searchValue}`), $options: 'i'
                    }
                },
            };
            let categoryFilter = {
                $match: {
                    specialization: args.category
                },
            };

            if (args.searchValue === undefined && args.category === undefined) {
                availableDoctors = await SessionModel.aggregate(pipeline);
            } else if (args.searchValue === undefined) {
                availableDoctors = await SessionModel.aggregate([...pipeline, categoryFilter]);
            } else if (args.category === undefined) {
                availableDoctors = await SessionModel.aggregate([...pipeline, searchValueFilter]);
            } else {
                availableDoctors = await SessionModel.aggregate([...pipeline, searchValueFilter, categoryFilter]);
            }

            return availableDoctors;
        },

        searchDoctors: async (_, args) => {
            let doctors;
            if (args.category === undefined) {
                doctors = await DoctorModel.find({
                    disName: {
                        $regex: new RegExp(`${args.searchValue}`), $options: 'i'
                    }
                })
            } else {
                doctors = await DoctorModel.find({
                    disName: {$regex: new RegExp(`${args.searchValue}`), $options: 'i'}, spec: args.category
                },)
            }
            return doctors;
        },
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
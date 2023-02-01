import {DoctorModel} from "../database/models/doctor-model.js";
import {SessionModel} from "../database/models/session-model.js";

export const createDoctor = async (doctor) => {
    return await DoctorModel.create(doctor);
}

export const findDoctorByMedicalCouncilNumber = async (id) => {
    return await DoctorModel.findById(id);
}

export const findAllDoctors = async (searchValue, category) => {
    let doctors;

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
                $regex: new RegExp(`${searchValue}`), $options: 'i'
            }
        },
    };

    let categoryFilter = {
        $match: {
            specialization: category
        },
    }

    if (searchValue === undefined && category === undefined) {
        doctors = await DoctorModel.aggregate(pipeline);
    } else if (searchValue === undefined) {
        doctors = await DoctorModel.aggregate([...pipeline, categoryFilter]);
    } else if (category === undefined) {
        doctors = await DoctorModel.aggregate([...pipeline, searchValueFilter]);
    } else {
        doctors = await DoctorModel.aggregate([...pipeline, searchValueFilter, categoryFilter]);
    }

    return doctors;
}

export const findAllAvailableDoctors = async (searchValue, category) => {
    let doctors;

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
                imageSrc: "$doctor.prfImgUrl"
            }
        },
    ];
    let searchValueFilter = {
        $match: {
            disName: {
                $regex: new RegExp(`${searchValue}`), $options: 'i'
            }
        },
    };
    let categoryFilter = {
        $match: {
            specialization: category
        },
    };

    if (searchValue === undefined && category === undefined) {
        doctors = await SessionModel.aggregate(pipeline);
    } else if (searchValue === undefined) {
        doctors = await SessionModel.aggregate([...pipeline, categoryFilter]);
    } else if (category === undefined) {
        doctors = await SessionModel.aggregate([...pipeline, searchValueFilter]);
    } else {
        doctors = await SessionModel.aggregate([...pipeline, searchValueFilter, categoryFilter]);
    }

    return doctors;
}

export const findDoctorSessionList = async (id) => {
    let pipeline = [{
        $match: {
            _id: id,
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
                            id: "$_id",
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

    return await DoctorModel.aggregate(pipeline);
}

export const findDoctorSessionListForChannelCenter = async (dctId, chId) => {
    let pipeline = [
        {
            $match: {
                _id: dctId,
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
                            chId: chId,
                        },
                    },
                    {
                        $project: {
                            id: "$_id",
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

    return await DoctorModel.aggregate(pipeline);
}
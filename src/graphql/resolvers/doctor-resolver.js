import {DoctorModel} from "../../database/models/doctor-model.js";
import {SessionModel} from "../../database/models/session-model.js";

export const doctorResolver = {
    Query: {
        getDoctors: async () => {
            let doctors = await DoctorModel.find();
            let finalDoctors = doctors.map ( doc=> ({
                _id : doc._id,
                disName: doc.disName,
                spec:doc.spec,
                prfImgUrl: doc.prfImgUrl
            }))
            let sessions = SessionModel.aggregate(
                [
                    // First step is to extract the "friends" field to work with the values
                    {
                        $unwind: "$friends"
                    },
                    // Lookup all the linked friends from the User collection
                    {
                        $lookup:
                            {
                                from: "User",
                                localField: "friends",
                                foreignField: "_id",
                                as: "friendsData"
                            }
                    },
                    // Sort the results by age
                    {
                        $sort: { 'friendsData.age': 1 }
                    },
                    // Get the results into a single array
                    {
                        $unwind: "$friendsData"
                    },
                    // Group the friends by user id
                    {
                        $group:
                            {
                                _id: "$_id",
                                friends: { $push: "$friends" },
                                friendsData: { $push: "$friendsData" }
                            }
                    }
                ]
            )
            return finalDoctors;
        },
        getDoctorById: async (_, args) => {
            let doctor = await DoctorModel.findById(args.id);
            return doctor;
        },
        searchDoctors: async (_, args) => {
            let doctors;
            if (args.category === undefined) {
                doctors = await DoctorModel.find({disName: {$regex: new RegExp(`${args.searchValue}`), $options: 'i'}})
            } else {
                doctors = await DoctorModel.find({
                    disName: {$regex: new RegExp(`${args.searchValue}`), $options: 'i'},
                    spec: args.category
                },)
            }
            return doctors;
        },
        getDoctor: async (_, args) => {
            let doctor = await DoctorModel.findById(args.id)
            let sessions = await SessionModel.find({dctId: args.id})
            return doctor;
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
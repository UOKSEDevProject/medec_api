import {DoctorModel} from "../../database/models/doctor-model.js";
import {SessionModel} from "../../database/models/session-model.js";

export const doctorResolver = {
    Query: {
        getDoctors: async () => {
            let doctors = await DoctorModel.find(); // There is a issue in this function [ Charith ]
            return doctors;
        },
        getDoctorById: async (_, args) => {
            let doctor = await DoctorModel.findById(args.id);
            return doctor;
        },
        searchDoctors: async (_, args) => {
            let doctors;
            if (args.category === undefined) {
                doctors = await DoctorModel.find({name: {$regex: new RegExp(`${args.name}`), $options: 'i'}})
            } else {
                doctors = await DoctorModel.find({
                    name: {$regex: new RegExp(`${args.name}`), $options: 'i'},
                    spec: args.category
                },)
            }
            return doctors;
        },
        getDoctor: async (_, args) => {
            let doctor = await DoctorModel.findById(args.id)
            let sessions = await SessionModel.find({dctId: args.id})
            console.log(sessions);
            return doctor;
        }
    },

    Mutation: {
        addDoctor: async (_, args) => {
            let doctor = {
                _id: args.doctor._id,
                name: args.doctor.name,
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
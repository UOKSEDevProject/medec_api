import {
    createDoctor,
    findAllAvailableDoctors,
    findAllDoctors,
    findDoctorByMedicalCouncilNumber,
    findDoctorSessionList,
    findDoctorSessionListForChannelCenter
} from "../../respositories/doctor-repository.js";
import {statusCodes, mailTexts} from "../../constants.js";
import constants from "../../constants.js";
import {onCreateHashPassword} from './auth-resolver.js';
import utils from '../../utils/utils.js';
import {updateDoctorsArray} from "../../respositories/chan-center-repository.js";

let response = {
    statusCode: null,
    statusDetails: null,
    payload: null
};

export const doctorResolver = {
    Query: {
        getDoctorById: async (_, args) => {
            let doctor = await findDoctorByMedicalCouncilNumber(args.id);

            if (doctor !== null) {
                response.statusCode = statusCodes.Onsuccess.code;
                response.statusDetails = statusCodes.Onsuccess.details;
                response.payload = doctor;
            } else {
                response.statusCode = statusCodes.OnNotFound.code;
                response.statusDetails = statusCodes.OnNotFound.details;
                response.payload = null;
            }

            return response;
        },

        getDoctors: async (_, args) => {
            return await findAllDoctors(args.searchValue, args.category);
        },

        getAvailableDoctors: async (_, args) => {
            return await findAllAvailableDoctors(args.searchValue, args.category);
        },

        getDoctorProfile: async (_, args) => {
            let doctors = await findDoctorSessionList(args.id);
            return doctors[0];
        },

        getDoctorProfileForChannelCenter: async (_, args) => {
            let doctors = await findDoctorSessionListForChannelCenter(args.id, args.chId);
            return doctors[0];
        },
    },

    Mutation: {
        addDoctor: async (_, args) => {
            let doctor = await findDoctorByMedicalCouncilNumber(args.doctor.mcNumber);

            if (doctor !== null) {
                response.statusCode = statusCodes.OnConflict.code;
                response.statusDetails = statusCodes.OnConflict.details;
                response.payload = doctor;
                return response;
            } else {
                let newDoctor = {
                    _id: args.doctor.mcNumber,
                    fullName: args.doctor.fullName,
                    disName: args.doctor.disName,
                    nameWithInitials: args.doctor.nameWithInitials,
                    sex: args.doctor.sex,
                    spec: args.doctor.spec,
                    cntNo: args.doctor.cntNo,
                    email: args.doctor.email,
                    address: args.doctor.address,
                    prfImgUrl: args.doctor.prfImgUrl
                }

                let created = await createDoctor(newDoctor).then(async (res) => {
                    new Promise(async (resolve, reject) => {
                        let object;
                        await utils.makePassword().then((password) => {
                            try {
                                object = {pwd: password, usr: newDoctor.email}
                                onCreateHashPassword(object, constants.authTypeDoctor, res._id, resolve)
                                utils.sendEMail(object.usr, mailTexts.DOCTOR_REGISTERED_SUCCESSFULLY, `Dr ${newDoctor.disName},\n Your password='${object.pwd}' and email='${object.usr}'`);
                            } catch (e) {
                                utils.sendEMail(object.usr, mailTexts.DOCTOR_REGISTERED_FAIL, `Dr ${newDoctor.disName},\n Your Medec registration was not succesfuly completed. Please contact the administration`);
                            }
                        });
                    })
                    await updateDoctorsArray(args.chId, args.doctor.mcNumber);
                    return res;
                });

                response.statusCode = statusCodes.Onsuccess.code;
                response.statusDetails = statusCodes.Onsuccess.details;
                response.payload = created;
            }
            return response;
        }
    }
}
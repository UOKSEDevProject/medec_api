import {ChanCenterModel} from "../../database/models/chan-center-model.js";
import {findChanCenterById, updateDoctorsArray} from "../../respositories/chan-center-repository.js";
import {findDoctorByMedicalCouncilNumber} from "../../respositories/doctor-repository.js";
import {statusCodes} from "../../constants.js";

let response = {
    statusCode: null,
    statusDetails: null,
    payload: null
};

export const chanCenterResolver = {
    Query: {
        getDoctorList: async (_, args) => {
            try {
                let chanCenter = await findChanCenterById(args.chId);

                if (chanCenter === null) {
                    response.statusCode = statusCodes.OnNotFound.code;
                    response.statusDetails = statusCodes.OnNotFound.details;
                    response.payload = null;
                } else {
                    let doctors = chanCenter.doctors.map(async (doctor) => {
                        return await findDoctorByMedicalCouncilNumber(doctor);
                    })
                    response.statusCode = statusCodes.Onsuccess.code;
                    response.statusDetails = statusCodes.Onsuccess.details;
                    response.payload = doctors;
                }

                return response;
            } catch (err) {
                response.statusCode = statusCodes.Onsuccess.code;
                response.statusDetails = statusCodes.Onsuccess.details;
                response.payload = null;
                return response;
            }
        }
    },

    Mutation: {
        addChannelCenter: async (_, args) => {
            try{
                let chanCenter = {
                    name: args.chanCenter.name,
                    address: args.chanCenter.address,
                    logoUrl: args.chanCenter.logoUrl,
                    cntNo: args.chanCenter.cntNo
                }

                return await ChanCenterModel.create(chanCenter);
            } catch (err) {
                response.statusCode = statusCodes.Onsuccess.code;
                response.statusDetails = statusCodes.Onsuccess.details;
                response.payload = null;
                return response;
            }
        },

        addDoctorToChannelCenter: async (_, args) => {
            try{
                let chanCenter = await findChanCenterById(args.chId);
                let doctor = await findDoctorByMedicalCouncilNumber(args.dctId);

                if (chanCenter === null || doctor === null) {
                    response.statusCode = statusCodes.OnNotFound.code;
                    response.statusDetails = statusCodes.OnNotFound.details;
                    response.payload = null;
                } else if (chanCenter.doctors.includes(args.dctId)) {
                    response.statusCode = statusCodes.OnConflict.code;
                    response.statusDetails = statusCodes.OnConflict.details;
                    response.payload = chanCenter;
                } else {
                    let updated = await updateDoctorsArray(args.chId, args.dctId);

                    if (updated.lastErrorObject.updatedExisting) {
                        response.statusCode = statusCodes.Onsuccess.code;
                        response.statusDetails = statusCodes.Onsuccess.details;
                        response.payload = updated.value;
                    } else {
                        response.statusCode = statusCodes.OnUnknownError.code;
                        response.statusDetails = statusCodes.OnUnknownError.details;
                        response.payload = null;
                    }
                }
                return response;
            } catch (err) {
                response.statusCode = statusCodes.Onsuccess.code;
                response.statusDetails = statusCodes.Onsuccess.details;
                response.payload = null;
                return response;
            }
        }
    }
}
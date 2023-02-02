import {PatientModel} from "../../database/models/patient-model.js";
import {findPatientById, getAppointments} from "../../respositories/patient-repository.js";
import {statusCodes} from "../../constants.js";
import {findLabReportsByPatientId} from "../../respositories/lab-report-repository.js";
import {sortArrayBasedOnMonthAndDate} from "../../utils/lab-report-utils.js";

let response = {
    statusCode: null,
    statusDetails: null,
    payload: null
};

export const patientResolver = {
    Query: {
        getAppointments: async (_, args) => {
            return await getAppointments(args.id);
        },

        getLabReportList: async (_, args) => {
            let patient = await findPatientById(args.pId);

            if (patient === null) {
                response.statusCode = statusCodes.OnNotFound.code;
                response.statusDetails = statusCodes.OnNotFound.details;
                response.payload = null;
                return response;
            }

            let reports = await findLabReportsByPatientId(args.pId);

            let results = sortArrayBasedOnMonthAndDate(reports);

            response.statusCode = statusCodes.Onsuccess.code;
            response.statusDetails = statusCodes.Onsuccess.details;
            response.payload = results;
            return response;
        },

        getMedicalReportList: async (_, args) => {
            let patient = await findPatientById(args.pId);

            if (patient === null) {
                response.statusCode = statusCodes.OnNotFound.code;
                response.statusDetails = statusCodes.OnNotFound.details;
                response.payload = null;
                return response;
            }

            let results = sortArrayBasedOnMonthAndDate(patient.mediHis);

            response.statusCode = statusCodes.Onsuccess.code;
            response.statusDetails = statusCodes.Onsuccess.details;
            response.payload = results;
            return response;
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
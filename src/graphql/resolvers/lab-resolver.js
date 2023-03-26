import {statusCodes} from "../../constants.js";
import {
    getPatientListForLaboratory,
    updateLabReportsOnRequested, updateLabReportStatusOnCompletion
} from "../../respositories/lab-report-repository.js";
import {findLaboratoryById} from "../../respositories/lab-repository.js";

let response = {
    statusCode: null,
    statusDetails: null,
    payload: null
};

export const labResolver = {
    Query: {
        getLabPatientList: async (_, args) => {
            try {
                let laboratory = await findLaboratoryById(args.lId);

                if (laboratory === null) {
                    response.statusCode = statusCodes.OnNotFound.code;
                    response.statusDetails = statusCodes.OnNotFound.details;
                    response.payload = null;
                } else {
                    let payload = await getPatientListForLaboratory(args.lId);
                    response.statusCode = statusCodes.Onsuccess.code;
                    response.statusDetails = statusCodes.Onsuccess.details;
                    response.payload = payload;
                }
                return response;
            } catch (err) {
                response.statusCode = statusCodes.OnUnknownError.code;
                response.statusDetails = err.message;
                return response;
            }
        }
    },

    Mutation: {
        updateSelectedLabReports: async (_, args) => {
            try {
                await updateLabReportsOnRequested(args.updateLabReportsInput.pId, args.updateLabReportsInput.lId,
                    args.updateLabReportsInput.labReqConfList);

                response.statusCode = statusCodes.Onsuccess.code;
                response.statusDetails = statusCodes.Onsuccess.details;
                return response;
            } catch (err) {
                response.statusCode = statusCodes.OnUnknownError.code;
                response.statusDetails = err.message;
                return response;
            }
        },

        updateLabReportsOnCompletion: async (_, args) => {
            try {
                await updateLabReportStatusOnCompletion(args.id, args.imgUrl);
                response.statusCode = statusCodes.Onsuccess.code;
                response.statusDetails = statusCodes.Onsuccess.details;
                return response;
            } catch (err) {
                response.statusCode = statusCodes.OnUnknownError.code;
                response.statusDetails = err.message;
                return response;
            }
        }
    }
}

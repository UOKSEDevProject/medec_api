import {statusCodes} from "../../constants.js";
import {
    getLabReportsListInConfirmList,
    getPatientListForLaboratory, saveLabReportAfterCompletion,
    updateLabReportsOnRequested
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
        }
    },

    Mutation: {
        updateSelectedLabReports: async (_, args) => {
            await updateLabReportsOnRequested(
                args.updateLabReportsInput.pId,
                args.updateLabReportsInput.lId,
                args.updateLabReportsInput.labReqConfList
            ).then(() => {
                response.statusCode = statusCodes.Onsuccess.code;
                response.statusDetails = statusCodes.Onsuccess.details;
            }).catch(err => {
                response.statusCode = statusCodes.OnUnknownError.code;
                response.statusDetails = err.message;
            });
            return response;
        },

        updateLabReportsOnCompletion: async (_, args) => {
            let confIdList = args.updateCompletedLabReport.compLabRepList.map(item => item.id);

            let results = await getLabReportsListInConfirmList(args.updateCompletedLabReport.pId,
                args.updateCompletedLabReport.lId, confIdList);

            await results.forEach(async item => {
                let imgUrl = confIdList.filter(confItem => confItem.id === item.id).imgUrl;
                await saveLabReportAfterCompletion(item._id, imgUrl);
            }).then(() => {
                response.statusCode = statusCodes.Onsuccess.code;
                response.statusDetails = statusCodes.Onsuccess.details;
            }).catch(err => {
                response.statusCode = statusCodes.OnUnknownError.code;
                response.statusDetails = err.message;
            });
            return response;
        }
    }
}

import apollo from "apollo-server-express";

export const labDefs = apollo.gql`  
    type Query {
        getLabPatientList(lId: String!): LapPatientMultipleResponse
    }
    
    type Mutation {
        updateSelectedLabReports(updateLabReportsInput: UpdateLabReportsInput!): StatusResponse
        updateLabReportsOnCompletion(updateCompletedLabReport: UpdateCompletedLabReport!): StatusResponse
    }
    
    type LapPatientSingleResponse{
        statusCode: String!
        statusDetail: String!
        payload: LabPatient
    }
    
    type LapPatientMultipleResponse{
        statusCode: String!
        statusDetails: String!
        payload: [LabPatient]
    }
    
    type LabPatient{
        _id:ID
        name: String!
        gender: String!
        birthDate: String!
        tp: String!
        profilePicture: String!
        reportList: [LabReportReq]
    }
    
    type LabReportReq{
        id: ID!
        name: String!
        status: String!
    }
    
    input UpdateLabReportsInput {
        pId: String!
        lId: String!
        labReqConfList: [String]!
    }
    
    input UpdateCompletedLabReport {
        pId: String!
        lId: String!
        compLabRepList: [CompletedLabReport]!
    }
    
    input CompletedLabReport {
        id: String!
        imgUrl: String!
    }
    
    input LabArgs {
        name: String!
        logoUrl: String!
        cntNo: String!
        address: String!
    }
`;
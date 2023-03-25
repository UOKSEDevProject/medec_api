import apollo from "apollo-server-express";

export const labDefs = apollo.gql`  
    type Query {
        getLabPatientList(lId: String!): LapPatientMultipleResponse
    }
    
    type Mutation {
        updateSelectedLabReports(updateLabReportsInput: UpdateLabReportsInput!): StatusResponse
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
        cntNo: String!
        labReports: [LabReportReq]
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
    
    input LabArgs {
        name: String!
        logoUrl: String!
        cntNo: String!
        address: String!
    }
`;
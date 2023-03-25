import apollo from "apollo-server-express";

export const labDefs = apollo.gql`  
    type LapPatientSingleResponse{
        statusCode: String!
        statusDetail: String!
        payload: LabPatient
    }
    
    type LapPatientMultipleResponse{
        statusCode: String!
        statusDetail: String!
        payload: [LabPatient]
    }
    
    type LabPatient{
        name: String!
        gender: String!
        birthDate: String!
        cntNo: String!
    }
    
    input LabArgs {
        name: String!
        logoUrl: String!
        cntNo: String!
        address: String!
    }
`;
import apollo from "apollo-server-express";

export const authDefs = apollo.gql`
    type Mutation {
        login (usr: String!, pwd: String!): Login
        register (usr: String!, pwd: String!, userArgs: UserArgs): Login
    }
    
    type Login {
        authSts: Int!
        authType: Int
        usrId: String
        tkn: String
        message: String
    }
    
    input UserArgs {
        chanCenterArgs: ChannelCenterArgs
        doctorArgs: DoctorArgs
        patientArgs: PatientArgs
        labArgs: LabArgs
    }
`;
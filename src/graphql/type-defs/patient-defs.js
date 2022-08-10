import apollo from "apollo-server-express";

export const patientDefs = apollo.gql`
    input PatientArgs {
        prfImgUrl: String!
        address: String!
        birthDate: String!
        des: String!
        sex: String!
        cntNo: String!
        bldGrp: String!
        mediHis: [MedHisArgs]
        disName: String!
        fullName: String!
        nameWithInitials: String!
    }
    
    input MedHisArgs {
        date: String!
        dct: String!
        imgPath: String!
    }
`;
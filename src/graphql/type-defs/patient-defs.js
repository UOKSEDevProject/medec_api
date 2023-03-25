import apollo from "apollo-server-express";

export const patientDefs = apollo.gql`
    type Query {
        getPatientProfile (id:String!): PatientResponse
        getAppointments (id:String!): [Appointment]
        getLabReportList (pId:String!): ReportResponse
        getMedicalReportList (pId:String!): ReportResponse
        getPatientReportRequirementList (pId:String!): ReportReqResponse 
    }

    type Mutation {
        addPatient (patient: PatientArgs!): Patient
    }
    
    type PatientResponse{
        statusCode:String!
        statusDetails: String!,
        payload: Patient
    }

    type ReportResponse {
        statusCode:String!
        statusDetails: String!,
        payload: [MonthlyReport]
    }
    
    type ReportReqResponse {
        statusCode:String!
        statusDetails: String!,
        payload: PatientReportReq
    }
    
    type PatientReportReq {
        patient: Patient!
        pendList: [ReportReq]!
    }
    
    type ReportReq{
        id: String!
        name: String!
    }

    type MonthlyReport {
        month: String!,
        reports: [Report]
    }

    type Report {
        id: String!,
        day: String!,
        description: String!,
        imgUrl: String!
    }

    type Patient {
        _id:String!
        fullName: String!
        disName: String!
        nameWithInitials: String!
        prfImgUrl: String!
        address: String!
        birthDate: String!
        bldGrp: String!
        des: String!
        sex: String!
        cntNo: String!
        mediHis: [MediHistory]!
    }
    
    type MediHistory {
        date: String!
        dct: String!
        imgPath: String!
    }

    type Appointment {
        channelCenter: String!
        dctName: String!
        date: String!
        time: String!
        aptNo: Int!
        refNo: String!
        currAptNo: Int!
    }

    input PatientArgs {
        fullName: String!
        disName: String!
        nameWithInitials: String!
        prfImgUrl: String!
        address: String!
        birthDate: String!
        bldGrp: String!
        des: String!
        sex: String!
        cntNo: String!
    }
`
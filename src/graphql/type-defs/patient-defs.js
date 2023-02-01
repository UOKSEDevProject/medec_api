import apollo from "apollo-server-express";

export const patientDefs = apollo.gql`
    type Query { 
         getAppointments (id:String!): [Appointment]
         getReportList (pId:String!): LabReportsResponse
    }
    
    type Mutation {
         addPatient (patient: PatientArgs!): Patient
    }
    
    type LabReportsResponse {
        statusCode:String!
        statusDetails: String!,
        payload: [MonthlyLabReport]
    }
    
    type MonthlyLabReport {
        title: String!,
        reports: [LabReport]
    }
    
    type LabReport {
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
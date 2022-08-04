import apollo from "apollo-server-express";

export const patientDefs = apollo.gql`
    type Query { 
         getPatients: [Patient]
         getAppointments(id:String!) : [Appointment]
    }
    
    type Mutation {
         addPatient (patient: PatientArgs!): Patient
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
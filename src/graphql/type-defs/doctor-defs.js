import apollo from "apollo-server-express";

export const doctorDefs = apollo.gql`
    type Query { 
        getDoctors: [DoctorAvailability] 
        getDoctor (id: String!): Doctor
        getDoctorById (id: String!): Doctor
        searchDoctors (searchValue: String!, category: String): [Doctor]
    }
    
    type Mutation {
        addDoctor (doctor: DoctorArgs!): Doctor
    }
    
    type Doctor {
         _id: String
         fullName: String
         disName: String
         nameWithInitials: String
         cntNo: String
         address: String
         spec: String
         prfImgUrl: String
         email: String
         sex: String
    }
    
    type DoctorAvailability{
         _id: String
         disName: String
         spec: String
         prfImgUrl: String
         chId: String
         ch_name: String
         status: String
    }
    
    input DoctorArgs {
         _id:String!
         fullName: String!
         disName: String!
         nameWithInitials: String!
         cntNo: String!
         address: String!
         spec: String!
         prfImgUrl: String!
         email: String!
         sex: String!
  }
`
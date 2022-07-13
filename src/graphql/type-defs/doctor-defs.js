import apollo from "apollo-server-express";

export const doctorDefs = apollo.gql`
    type Query { 
        getDoctors: [Doctor] 
        getDoctor (id: String!): Doctor
        getDoctorById (id: String!): Doctor
        searchDoctors (name: String!, category: String): [Doctor]
    }
    
    type Mutation {
        addDoctor (doctor: DoctorArgs!): Doctor
    }
    
    type Doctor {
         _id: String!
         name: String!
         cntNo: String!
         address: String!
         spec: String!
         prfImgUrl: String!
         email: String!
         sex: String!
    }
    
    input DoctorArgs {
         _id:String!
         name: String!
         cntNo: String!
         address: String!
         spec: String!
         prfImgUrl: String!
         email: String!
         sex: String!
  }
`
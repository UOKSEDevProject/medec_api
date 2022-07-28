import apollo from "apollo-server-express";

export const doctorDefs = apollo.gql`
    type Query { 
        getDoctors: [Doctor] 
        getDoctorSessionList (id: String!): DoctorProfile
        getDoctorById (id: String!): Doctor
        getAvailableDoctors: [AvailableDoctor]
        searchDoctors (searchValue: String!, category: String): [Doctor]
    }
    
    type Mutation {
        addDoctor (doctor: DoctorArgs!): Doctor
    }
    
     type Doctor {
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
    
    type DoctorProfile {
        _id: String!
        disName: String!
        spec: String!
        prfImgUrl: String!
        sessions: [ChannelCenterType]!
    }
    
    type ChannelCenterType {
        hospitalName: String!
        sessionsList: [ChannelCenterSession]!
    }
    
    type ChannelCenterSession{
        time: String!
        date: String!
        appointments: Int!
        maximumAppointments: Int!
    }
    
    type AvailableDoctor{
         _id: String!
         disName: String!
         mediCenter: String!
         specialization: String!
         imageSrc: String!
         status: String!
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
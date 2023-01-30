import apollo from "apollo-server-express";

export const doctorDefs = apollo.gql`
    type Query { 
        getDoctorById (id: String!): Response
        getDoctors (searchValue: String, category: String): [AvailableDoctor] 
        getDoctorSessionList (id: String!): DoctorProfile
        getDoctorSessionListForChannelCenter (id: String!, chId: String!): ChannelCenterDoctorProfile
        getAvailableDoctors (searchValue: String, category: String): [AvailableDoctor]
        searchDoctors (searchValue: String!, category: String): [Doctor]
    }
    
    type Mutation {
         addDoctor (doctor: DoctorArgs!): Response
    }
    
    type Response{
        statusCode:String!
        statusDetails: String!,
        payload: Doctor
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
        channelCenters : [ChannelCenterSessions]!
    }
    
    type ChannelCenterDoctorProfile {
        _id: String!
        disName: String!
        spec: String!
        prfImgUrl: String!
        sessionsList: [ChannelCenterSession]!
    }
    
    type ChannelCenterSessions {
        _id:String!
        hospitalName: String!
        sessionsList: [ChannelCenterSession]!
    }
    
    type ChannelCenterSession{
        id:String!
        time: String!
        date: String!
        appointments: Int!
        maximumAppointments: Int!
    }
    
    type AvailableDoctor{
         _id: String!
         disName: String!
         specialization: String!
         imageSrc: String!
         mediCenter: String
         status: Boolean
    }
    
    input DoctorArgs {
         mcNumber:String!
         fullName: String!
         disName: String!
         nameWithInitials: String!
         sex: String!
         spec: String!
         cntNo: String!
         email: String!
         address: String!
         prfImgUrl: String
    }
`
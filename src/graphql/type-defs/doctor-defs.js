import apollo from "apollo-server-express";

export const doctorDefs = apollo.gql`
    type Query { 
        getDoctorById (id: String!): Response
        getDoctors (searchValue: String, category: String): [GetDoctorResponse] 
        getAvailableDoctors (searchValue: String, category: String): [GetAvailableDoctorResponse]
        getDoctorProfile (id: String!): DoctorProfile
        getDoctorProfileForChannelCenter (id: String!, chId: String!): ChannelCenterDoctorProfile
    }
    
    type Mutation {
         addDoctor (chId:String!, doctor: DoctorArgs!): Response
         addDoctorRecommendation(doctorRecommendation: DoctorRecommendation!): StatusResponse
    }
    
    type StatusResponse{
        statusCode:String!
        statusDetails: String!,
    }
    
    type Response{
        statusCode:String!
        statusDetails: String!,
        payload: Doctor
    }
    
     type GetDoctorResponse {
         _id: String!
         disName: String!
         specialization: String!
         imageSrc: String!
         mediCenter: String
         status: Boolean!
    }
    
    type Doctor {
         _id:String!
         fullName: String!
         disName: String!
         nameWithInitials: String!
         cntNo: String!
         address: String!
         spec: String!
         prfImgUrl: String
         email: String!
         sex: String!
    }
    
    type GetAvailableDoctorResponse{
         _id: String!
         disName: String!
         specialization: String!
         imageSrc: String!
         mediCenter: String!
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
    
    input DoctorRecommendation{
        pId: String!,
        dctId: String!
        presImgUrl: String!,
        reqList: [String]!
    }
`
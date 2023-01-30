import apollo from "apollo-server-express";

export const chanCenterDefs = apollo.gql`
    type Query {    
        getChannelCenters: [ChannelCenter]
        getChannelCenterById (id: String!): ChannelCenter
        getDoctorList (chId: String!): DoctorListResponse
    }
    
    type Mutation {
        addChannelCenter (chanCenter: ChannelCenterArgs!): ChannelCenter
        addDoctorToChannelCenter (chId: String!, dctId: String!): ChanCenterResponse
    }
    
    type ChanCenterResponse{
        statusCode:String!
        statusDetails: String!,
        payload: ChannelCenter
    }
    
    type DoctorListResponse{
        statusCode:String!
        statusDetails: String!,
        payload: [Doctor]
    }
    
    type ChannelCenter {
         _id: String!
         name: String!
         address: String!
         cntNo: String!
         logoUrl: String!
         doctors: [String]!
    }
    
    input ChannelCenterArgs {
      name: String!
      address: String!
      cntNo: String!
      logoUrl: String!
  }
`
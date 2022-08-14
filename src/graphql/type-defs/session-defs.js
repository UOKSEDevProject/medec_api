import apollo from "apollo-server-express";

export const sessionDefs = apollo.gql `
    type Query {
        getSessions: [Session]
    }
    
    type Mutation {
        createSession (session: SessionArgs!): Session
        updateSession (sessionId: String!, session: SessionUpdateArgs!): Session
        createApt (sessionId: String!, aptArgs: AppointmentArgs!): Session
        updateAptSts (sessionId: String!, aptId: String!, sts: String!): Session
    }
    
    type Subscription {
        sessionListener (sessionId: String!): Session
    }
    
    type Session {
         _id: String!
         dctId: String!
         chId: String!
         strTime: String!
         date: String!
         maxApts: Int!
         totApts: Int!
         curAptNo: Int!
         status:String!
         apts: [Appointments]!
    }
    
    type Appointments {
         _id: String!
         pId: String!
         pName: String!
         activeSt: String!
         aptNo: Int!
    }
    
    input SessionArgs {
         dctId: String!
         chId: String!
         strTime: String!
         date: String!
         maxApts: Int!
         totApts: Int!
         curAptNo: Int!
         status:String!
         apts: [AppointmentArgs]!
    }
    
    input AppointmentArgs {
         pId: String!
         pName: String!
         activeSt: String!
         aptNo: Int!
    }
    
    input SessionUpdateArgs {
         dctId: String
         chId: String
         strTime: String
         date: String
         maxApts: Int
         totApts: Int
         curAptNo: Int
         status:String
         apts: [AppointmentUpdateArgs]
    }
    
    input AppointmentUpdateArgs {
         pId: String
         pName: String
         activeSt: String
         aptNo: Int
    }
`
import apollo from "apollo-server-express";

export const sessionDefs = apollo.gql `
    type Query {
        getSessions: [Session]
    }
    
    type Mutation {
        addSession (session: SessionArgs!): Session
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
    }
`
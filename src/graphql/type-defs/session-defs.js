import apollo from "apollo-server-express";

export const sessionDefs = apollo.gql`
    type Query {
        getPatientList(sessionId: String!): PatientListApiResponse
    }
    
    type Mutation {
        createSession (session: SessionArgs!): SessionApiResponse
        updateSession (sessionId: String!, session: SessionUpdateArgs!): SessionApiResponse
        updateSessionStatus (sessionId: String!, status: String!, curAptNo: Int!, aptId: String!): StatusResponse
        deleteSession (sessionId: String!): SessionApiResponse
        addAppointment (sessionId: String!, pId: String!): SessionApiResponse
        updateAptSts (sessionId: String!, aptId: String!, sts: String!): Session
    }
    
    type Subscription {
        sessionListener (sessionId: String!): Session
    }
    
    type SessionApiResponse{
        statusCode:String!
        statusDetails: String!,
        payload: Session
    }
    
    type PatientListApiResponse {
        statusCode:String!
        statusDetails: String!,
        payload: [PatientListObject]
    }
    
    type PatientListObject{
        _id: String
        aptId: String
        name: String
        bloodGroup: String
        birthDate: String
        address: String
        description: String
        prfImgUrl: String
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
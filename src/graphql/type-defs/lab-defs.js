import apollo from "apollo-server-express";

export const labDefs = apollo.gql`
    input LabArgs {
        name: String!
        logoUrl: String!
        cntNo: String!
        address: String!
    }
`;
import {connectDatabase} from "./database/connection.js";
import {apolloServerConnection} from "./apollo-server-connection.js"

// Start the application
connectDatabase(apolloServerConnection.startApolloServer);
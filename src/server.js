import {connectDatabase} from "./database/connection.js";
import {ApolloServer} from "apollo-server-express";
import express from "express";
import * as http from "http";
import {ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageDisabled, ApolloServerPluginLandingPageLocalDefault} from "apollo-server-core";
import {config} from "./config.js";
import {typeDefs} from "./graphql/type-defs.js";
import {resolvers} from "./graphql/resolvers.js";

async function startApolloServer() {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            config.ENVIRONMENT === 'production' ? ApolloServerPluginLandingPageDisabled() : ApolloServerPluginLandingPageLocalDefault({ footer: false })
        ],
    });

    await server.start();
    server.applyMiddleware({app, path: "/graphql"});

    app.listen(config.SERVER_PORT, () => {
        console.log(`Apollo Server on http://localhost:${config.SERVER_PORT}/graphql`);
    });
}

// start the application
connectDatabase(startApolloServer);
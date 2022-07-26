import {ApolloServer} from "apollo-server-express";
import express from "express";
import * as http from "http";
import {ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageDisabled, ApolloServerPluginLandingPageLocalDefault} from "apollo-server-core";
import {config} from "./config.js";
import {typeDefs} from "./graphql/type-defs.js";
import {resolvers} from "./graphql/resolvers.js";
import {WebSocketServer} from "ws";
import {useServer} from "graphql-ws/lib/use/ws";
import {makeExecutableSchema} from "@graphql-tools/schema";
import {PubSub} from "graphql-subscriptions";

const pubsub = new PubSub();

async function startApolloServer() {
    const app = express();
    const httpServer = http.createServer(app);

    const schema = makeExecutableSchema({
        typeDefs: typeDefs,
        resolvers: resolvers
    });

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: "/graphql",
    });

    const server = new ApolloServer({
        schema: schema,
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            config.ENVIRONMENT === 'production' ? ApolloServerPluginLandingPageDisabled() : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
            {async serverWillStart() {return {async drainServer() {await serverCleanup.dispose();},};},}
        ]
    });

    const serverCleanup = useServer({ schema }, wsServer);

    await server.start();
    server.applyMiddleware({app});

    httpServer.listen(config.SERVER_PORT, () => {
        console.log(`Apollo Server on http://localhost:${config.SERVER_PORT}${server.graphqlPath}`);
    });
}

export const apolloServerConnection = {
    startApolloServer: startApolloServer,
    pubsub: pubsub
}
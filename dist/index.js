import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from 'cors';
import express from 'express';
import http from 'http';
import { typeDefs } from './schema';
import { resolvers as QueryResolvers } from './resolvers/Query';
// Express integration
// httpServer handles incoming requests to our Express app.
// Apollo will drain this httpServer, shutting down gracefully.
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
    typeDefs,
    resolvers: QueryResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});
// Note you must call `start()` on the `ApolloServer`
// instance before passing the instance to `expressMiddleware`
await server.start();
// Specify the path where we'd like to mount our server
//highlight-start
app.use('/graphql', cors(), express.json(), 
// expressMiddleware accepts the same arguments:
// an Apollo Server instance and optional configuration options
expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
}));
// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);
//highlight-end

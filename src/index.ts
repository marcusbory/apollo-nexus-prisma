import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import cors from 'cors'
import express from 'express'
import http from 'http'
import { schema } from './api/schema'
import { Context, context } from './context'


interface MyContext {
  token?: string
}

// Express integration
// httpServer handles incoming requests to our Express app.
// Apollo will drain this httpServer, shutting down gracefully.
const app = express()
const httpServer = http.createServer(app)

const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
})
// Note you must call `start()` on the `ApolloServer`
// instance before passing the instance to `expressMiddleware`
await server.start()

// Specify the path where we'd like to mount our server
//highlight-start
app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  express.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    // Adding the main context here because we are using express
    // Use this to fetch user info
    context: async ({ req }) => (context),
  })
)

// Modified server startup
await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve))
console.log(`🚀 Server ready at http://localhost:4000/`)
//highlight-end

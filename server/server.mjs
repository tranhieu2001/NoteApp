import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { makeExecutableSchema } from '@graphql-tools/schema'
import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import { getAuth } from 'firebase-admin/auth'
import { useServer } from 'graphql-ws/lib/use/ws'
import http from 'http'
import mongoose from 'mongoose'
import { WebSocketServer } from 'ws'
import helmet from 'helmet'
import compression from 'compression'

import './firebase/config.js'
import { resolvers } from './resolvers/index.js'
import { typeDefs } from './schemas/index.js'

const app = express()
const httpServer = http.createServer(app)

// ------------------------------------------------------ Connect to DB ------------------------------------------------------
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@note-app.pdkgo28.mongodb.net/?retryWrites=true&w=majority`
const PORT = process.env.PORT || 4000

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('Connected to DB')
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve))
    console.log('🚀 Server ready at http://localhost:4000')
  })
// ------------------------------------------------------ Connect to DB ------------------------------------------------------

// ------------------------------------------------------ Setup apollo server ------------------------------------------------------
const schema = makeExecutableSchema({ typeDefs, resolvers })

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
})

const serverCleanup = useServer({ schema }, wsServer)

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose()
          },
        }
      },
    },
  ],
})

await server.start()

// ------------------------------------------------------ Setup apollo server ------------------------------------------------------

const authorizationJWT = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization

  if (authorizationHeader) {
    const accessToken = authorizationHeader.split(' ')[1]

    getAuth()
      .verifyIdToken(accessToken)
      .then((decodedToken) => {
        res.locals.uid = decodedToken.uid
        next()
      })
      .catch((err) => {
        console.log({ err })
        return res.status(403).json({ message: 'Forbidden', error: err })
      })
  } else {
    next()
    // return res.status(401).json({ message: 'Unauthorized' });
  }
}

// context là đối số thứ 3 của resolver graphQL
app.use(
  cors(),
  helmet(),
  compression(),
  authorizationJWT,
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return { uid: res.locals.uid }
    },
  })
)

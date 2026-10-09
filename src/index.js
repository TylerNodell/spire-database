const { createServer } = require('http')
const { readFileSync } = require('fs')
const { join } = require('path')
const { createYoga, createSchema } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Agent = require('./resolvers/Agent')
const Unit = require('./resolvers/Unit')
const Building = require('./resolvers/Building')

const prisma = new PrismaClient()

  // 1
  const resolvers = {
    Query,
    Mutation,
    Agent,
    Unit,
    Building
  }
// Browsers on other origins are only allowed if listed in CORS_ORIGIN (comma separated).
const corsOrigins = (process.env.CORS_ORIGIN || '').split(',').map(o => o.trim()).filter(Boolean)

const yoga = createYoga({
  schema: createSchema({
    typeDefs: readFileSync(join(__dirname, 'schema.graphql'), 'utf8'),
    resolvers,
  }),
  // yoga already puts the incoming `request` on the context
  context: () => ({ prisma }),
  graphqlEndpoint: '/',
  graphiql: process.env.NODE_ENV !== 'production',
  // No CORS headers at all for origins that are not listed. Auth uses the
  // Authorization header, not cookies, so credentials are never allowed.
  cors: request =>
    corsOrigins.includes(request.headers.get('origin')) ? { origin: corsOrigins, credentials: false } : false,
})
const port = process.env.PORT || 4000
createServer(yoga).listen(port, () => console.log(`Server is running on http://localhost:${port}`))
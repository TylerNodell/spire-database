const { GraphQLServer } = require('graphql-yoga')
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
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
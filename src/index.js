const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

  // 1
  const resolvers = {
    Query: {
      info: () => `This is the Spire Dev Server`,
      feed: async (parent, args, context) => {
        return context.prisma.building.findMany()
      },
    },
    Mutation: {
      // 2
      newBuilding: (parent, args, context, info) => {
        const newBuilding = context.prisma.building.create({
          data: {
            name: args.name,
            address: args.address,
          },
        })
        return newBuilding
      },
    },
  }
const server = new GraphQLServer({
typeDefs: './src/schema.graphql',
resolvers,
context: {
    prisma,
}
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
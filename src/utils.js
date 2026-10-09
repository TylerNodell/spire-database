const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')
// JWT signing secret. It must come from the environment: a secret committed
// to the repository lets anyone forge a token for any agent.
const APP_SECRET = process.env.APP_SECRET
if (!APP_SECRET || APP_SECRET.length < 32) {
  throw new Error('APP_SECRET must be set to a random string of at least 32 characters (see .env.example)')
}

function getAgentId(context) {
  const Authorization = context.request.headers.get('authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    try {
      const { agentId } = jwt.verify(token, APP_SECRET, { algorithms: ['HS256'] })
      return agentId
    } catch (e) {
      // invalid or expired token: fall through to the error below
    }
  }

  throw new GraphQLError('Not authenticated')
}

module.exports = {
  APP_SECRET,
  getAgentId,
}
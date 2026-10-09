const jwt = require('jsonwebtoken')
// JWT signing secret. It must come from the environment: a secret committed
// to the repository lets anyone forge a token for any agent.
const APP_SECRET = process.env.APP_SECRET
if (!APP_SECRET || APP_SECRET.length < 32) {
  throw new Error('APP_SECRET must be set to a random string of at least 32 characters (see .env.example)')
}

function getAgentId(context) {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { agentId } = jwt.verify(token, APP_SECRET)
    return agentId
  }

  throw new Error('Not authenticated')
}

module.exports = {
  APP_SECRET,
  getAgentId,
}
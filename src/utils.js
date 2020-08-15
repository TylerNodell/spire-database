const jwt = require('jsonwebtoken')
const APP_SECRET = 'spiredevelopmentgroup'

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
const { getAgentId } = require('../utils')

// Every query returns agent, owner or tenant data (directly or through
// nested fields), so each one requires a valid login token.
function units(parent, args, context, info) {
  getAgentId(context)
  return context.prisma.unit.findMany()
}

function unit(parent, args, context, info) {
  getAgentId(context)
  return context.prisma.unit.findUnique({
    where: { id: args.id }
  })
}

function buildings(parent, args, context, info){
  getAgentId(context)
    return context.prisma.building.findMany()
}

function building(parent, args, context, info) {
  getAgentId(context)
  return context.prisma.building.findUnique({
    where: { id: args.id }
  })
}

function agents(parent, args, context, info){
  getAgentId(context)
  return context.prisma.agent.findMany()
}

function agent(parent, args, context, info) {
  getAgentId(context)
  return context.prisma.agent.findUnique({
    where: { id: args.id }
  })
}

function owners(parent, args, context, info){
  getAgentId(context)
  return context.prisma.owner.findMany()
}

function owner(parent, args, context, info) {
  getAgentId(context)
  return context.prisma.owner.findUnique({
    where: { id: args.id }
  })
}

function tenants(parent, args, context, info){
  getAgentId(context)
  return context.prisma.tenant.findMany()
}

function tenant(parent, args, context, info) {
  getAgentId(context)
  return context.prisma.tenant.findUnique({
    where: { id: args.id }
  })
}
  
  module.exports = {
    units,
    unit,
    buildings,
    building,
    agents,
    agent,
    owners,
    owner,
    tenants,
    tenant
  }
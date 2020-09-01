function units(parent, args, context, info) {
  return context.prisma.unit.findMany()
}

function unit(parent, args, context, info) {
  return context.prisma.unit.findOne({
    where: { id: args.id }
  })
}

function buildings(parent, args, context, info){
    return context.prisma.building.findMany()
}

function building(parent, args, context, info) {
  return context.prisma.building.findOne({
    where: { id: args.id }
  })
}

function agents(parent, args, context, info){
  return context.prisma.agent.findMany()
}

function agent(parent, args, context, info) {
  return context.prisma.agent.findOne({
    where: { id: args.id }
  })
}

function owners(parent, args, context, info){
  return context.prisma.owner.findMany()
}

function owner(parent, args, context, info) {
  return context.prisma.owner.findOne({
    where: { id: args.id }
  })
}

function tenants(parent, args, context, info){
  return context.prisma.tenant.findMany()
}

function tenant(parent, args, context, info) {
  return context.prisma.tenant.findOne({
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
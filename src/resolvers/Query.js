function feed(parent, args, context, info) {
    return context.prisma.unit.findMany()
  }

function buildings(parent, args, context, info){
    return context.prisma.building.findMany()
}
  
  module.exports = {
    feed,
    buildings
  }
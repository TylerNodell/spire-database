function units(parent, args, context) {
    return context.prisma.building.findMany({ where: { id: parent.id } }).units()
  }
  
  module.exports = {
    units,
  }
function units(parent, args, context) {
    return context.prisma.agent.findUnique({ where: { id: parent.id } }).units()
  }
  
  module.exports = {
    units,
  }
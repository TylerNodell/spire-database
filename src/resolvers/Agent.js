function units(parent, args, context) {
    return context.prisma.agent.findOne({ where: { id: parent.id } }).units()
  }
  
  module.exports = {
    units,
  }
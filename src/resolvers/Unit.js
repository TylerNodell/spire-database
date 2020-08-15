function agent(parent, args, context) {
    return context.prisma.unit.findOne({ where: { id: parent.id } }).agent()
  }
  
  module.exports = {
    agent,
  }
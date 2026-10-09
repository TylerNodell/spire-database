function agent(parent, args, context) {
    return context.prisma.unit.findUnique({ where: { id: parent.id } }).agent()
  }
  
  module.exports = {
    agent,
  }
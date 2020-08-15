const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getAgentId } = require('../utils')

async function signup(parent, args, context, info) {
// 1
    const password = await bcrypt.hash(args.password, 10)

    // 2
    const agent = await context.prisma.agent.create({ data: { ...args, password } })

    // 3
    const token = jwt.sign({ agentId: agent.id }, APP_SECRET)

    // 4
    return {
        token,
        agent,
    }
}

async function login(parent, args, context, info) {
// 1
    const agent = await context.prisma.agent.findOne({ where: { email: args.email } })
    if (!agent) {
        throw new Error('No such agent found')
    }

    // 2
    const valid = await bcrypt.compare(args.password, agent.password)
    if (!valid) {
        throw new Error('Invalid password')
    }

    const token = jwt.sign({ agentId: agent.id }, APP_SECRET)

    // 3
    return {
        token,
        agent,
    }
}


function createListing(parent, args, context, info) {
    const agentId = getAgentId(context)

    return context.prisma.unit.create({
        data: {
        apt: args.apt,
        sale: args.sale,
        agent: { connect: { id: agentId } },
        building: {
            connectOrCreate: {
                where: { id: args.buildingId},
                create: { name: args.buildingName, address: args.buildingAddress}
            }
        }
        }
    })
}

module.exports = {
signup,
login,
createListing,
}
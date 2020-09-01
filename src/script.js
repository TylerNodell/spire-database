// 1
const { PrismaClient } = require("@prisma/client")

// 2
const prisma = new PrismaClient()

//3
async function main() {
    const newBuilding = await prisma.building.create({
        data: {
          name: "Park Millenium",
          address: '157 West 57th Street',
        }
    })
    const allLinks = await prisma.link.findMany()
    const allBuildings = await prisma.building.findMany()
  console.log(allLinks)
  console.log(allBuildings)
}

//4
main()
  .catch(e => {
    throw e
  })
  // 5
  .finally(async () => {
    await prisma.$disconnect()
  })
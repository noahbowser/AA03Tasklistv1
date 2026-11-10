const { PrismaClient } = require("@prisma/client");

// Eine gemeinsame Prisma-Client-Instanz für die ganze Applikation
const prisma = new PrismaClient();

module.exports = prisma;

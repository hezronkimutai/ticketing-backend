const prisma = require('./src/prisma/client');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.test' });

jest.setTimeout(30000);

module.exports = async () => {
  try {
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

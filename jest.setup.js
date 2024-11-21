console.log('Loading Jest setup file...');

const { execSync } = require('child_process');
const prisma = require('./src/prisma/client');
const dotenv = require('dotenv');

// Load environment variables for the test environment
dotenv.config({ path: '.env.test' });

jest.setTimeout(30000); // Set Jest timeout to 30 seconds

module.exports = async () => {
  console.log('Initializing test database reset...');

  try {
    // Reset the database using migrations (if schema needs resetting)
    execSync(
      'npx prisma migrate reset --force --skip-seed --schema=./prisma/schema.prisma',
      { stdio: 'inherit' }
    );

    console.log('Database schema reset successfully.');

    // Manually delete data from all tables
    console.log('Deleting test data from all tables...');
    await prisma.ticket.deleteMany();
    await prisma.ticketCategory.deleteMany();
    await prisma.event.deleteMany();
    await prisma.user.deleteMany();

    console.log('Test data cleared from all tables.');
  } catch (error) {
    console.error('Error during test database setup:', error.message);
    throw error;
  } finally {
    // Ensure Prisma disconnects cleanly
    await prisma.$disconnect();
  }
};

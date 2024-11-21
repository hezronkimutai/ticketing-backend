import { execSync } from 'child_process';
import prisma from './src/prisma/client';
import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });
jest.setTimeout(30000); // Timeout in milliseconds (e.g., 30 seconds)

export default async () => {
  try {
    console.log('Resetting the test database...');
    
    // Reset the test database using Prisma migrations
    execSync('npx prisma migrate reset --force --skip-seed --schema=./prisma/schema.prisma', {
      stdio: 'inherit',
    });

    console.log('Test database reset successfully.');
  } catch (error) {
    console.error('Failed to reset the test database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

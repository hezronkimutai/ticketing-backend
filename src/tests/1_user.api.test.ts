import { request } from '.';
import prisma from '../prisma/client';

describe('Express API with Real Database', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
  });

  const userData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe4@example.com',
    verified: true,
    status: 'ACTIVE',
  };

  it('should return health status', async () => {
    const response = await request.get('/health');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Server is healthy');
  });

  it('should create a new user via POST /api/users', async () => {
    const response = await request.post('/api/users').send(userData);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(userData);
  });

  it('should fetch all users via GET /api/users', async () => {
    const response = await request.get('/api/users');
    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});

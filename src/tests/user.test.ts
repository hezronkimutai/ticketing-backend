import request from 'supertest';
import app from '../index';  // Import the Express app

describe('Express API', () => {
  it('should return a healthy status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Server is healthy');
  });

});

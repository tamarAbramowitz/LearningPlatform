import request from 'supertest';
import app from '../app'; // Adjust path as needed
import mongoose from 'mongoose';

describe('User Controller', () => {
  beforeAll(async () => {
    // Connect to test DB if needed
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should register a user', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        id: '123456789',
        name: 'Test User',
        phone: '0501234567'
      });
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it('should login a user', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({
        id: '123456789',
        name: 'Test User',
        phone: '0501234567'
      });
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
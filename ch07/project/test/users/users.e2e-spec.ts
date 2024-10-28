import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, VersioningType } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('User Module (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('POST /v1/users - should create a new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/v1/users')
      .set('Authorization', 'Bearer mock-token') // add the mock token to the request object as a header
      .send({
        name: 'Justin Dusenge',
        email: 'justin@example.com',
        address: 'Kigali, Rwanda',
      })
      .expect(201);
    const { data, success, timestamp } = response.body;

    expect(data).toHaveProperty('id');
    expect(data.name).toEqual('Justin Dusenge');
    expect(data.email).toEqual('justin@example.com');

    expect(success).toBe(true);

    expect(timestamp).toBeDefined();
  });

  it('GET /v1/users - should retrieve all users', async () => {
    const response = await request(app.getHttpServer())
      .get('/v1/users')
      .expect(200);
    const { data, success, timestamp } = response.body;

    expect(Array.isArray(data)).toBeTruthy();
    expect(data[0]).toHaveProperty('name');

    expect(success).toBe(true);

    expect(timestamp).toBeDefined();

    // negative test
    expect(data[0]).not.toHaveProperty('address'); // version 1 does not have address
    expect(data).not.toHaveProperty('meta'); // version 1 does not have pagination
  });

  it('GET /v2/users - should retrieve paginated users', async () => {
    const response = await request(app.getHttpServer())
      .get('/v2/users?page=1&limit=2')
      .expect(200);

    const { data, success } = response.body;
    expect(data.data.length).toBeGreaterThan(2);
    expect(data).toHaveProperty('meta');
    expect(data.meta).toHaveProperty('total');

    // the default limit is 10 and the default page is 1
    expect(data.meta.limit).toBe(10);
    expect(data.meta.page).toBe(1);

    expect(success).toBe(true);
  });

  it('PUT /v1/users/:id - should update a user', async () => {
    const userId = 1; // Assuming this ID exists in our test mock data
    const updatedUserData = {
      name: 'John Updated',
      email: 'updated@example.com',
    };

    const response = await request(app.getHttpServer())
      .patch(`/v1/users/${userId}`)
      .set('Authorization', 'Bearer mock-token')
      .send(updatedUserData)
      .expect(200);

    const { data, success } = response.body;
    expect(data).toHaveProperty('id');
    expect(data.name).toEqual(updatedUserData.name);
    expect(data.email).toEqual(updatedUserData.email);

    expect(success).toBe(true);
  });
});

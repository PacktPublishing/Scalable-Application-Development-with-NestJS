import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  GET_HELLO,
  GET_HELLO_OPERATION_NAME,
  GRAPHQL_ENDPOINT,
  HELL0_WORLD,
} from '../src/common/helpers/graphql.helper';

jest.setTimeout(70000);

describe('AppResolver (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should get a hello world', () => {
    return request(app.getHttpServer())
      .post(GRAPHQL_ENDPOINT)
      .send({
        operationName: GET_HELLO_OPERATION_NAME,
        query: GET_HELLO,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.getHello).toBe(HELL0_WORLD);
      });
  });
});

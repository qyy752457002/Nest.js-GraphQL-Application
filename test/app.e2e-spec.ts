import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
// 导入supertest库，用于发送HTTP请求
import request from 'supertest';

// 描述一个集成测试，测试GraphQL查询端点
describe('GraphQL API (e2e)', () => {
  let app: INestApplication;

  // 在所有测试之前执行的操作，只执行一次
  beforeAll(async () => {
    // 创建一个测试模块，包含AppModule
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // 导入AppModule
    }).compile(); // 编译测试模块

    // 创建Nest应用程序实例
    app = moduleFixture.createNestApplication();
    // 初始化应用程序
    await app.init();
  });

  // 在所有测试结束后执行的操作，只执行一次
  afterAll(async () => {
    // 关闭Nest应用程序实例
    await app.close();
  });

  // 对GraphQL查询端点进行测试
  it('GraphQL Query', async () => {
    const query = `
      query Student {
        student(id: "9c9fef98-cce5-44e7-9291-52f857ba175c") {
          id
          firstName
          lastName
        }
      }
    `;

    // 发起一个POST请求到GraphQL端点，发送GraphQL查询
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query });

    // 验证 HTTP 状态码是否为 200 (OK)
    expect(response.status).toBe(200);

    // 验证响应中是否包含预期的数据
    expect(response.body.data).toEqual({
      student: {
        id: '9c9fef98-cce5-44e7-9291-52f857ba175c',
        firstName: 'Yiyu',
        lastName: 'Qian',
      },
    });
  });
});

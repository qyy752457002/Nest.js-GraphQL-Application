import { NestFactory } from '@nestjs/core'; // 导入 NestFactory 从 '@nestjs/core' 模块
import { AppModule } from './app.module'; // 导入 AppModule 从 './app.module' 文件
import { ValidationPipe } from '@nestjs/common'; // 导入 ValidationPipe 从 '@nestjs/common' 模块
import { ConfigService } from '@nestjs/config'; // 导入 ConfigService 从 '@nestjs/config' 模块
import { Logger } from '@nestjs/common'; // 用于日志记录的 Nest.js 内置模块

async function bootstrap() {
  // 定义异步函数 bootstrap
  const app = await NestFactory.create(AppModule); // 创建 Nest 应用实例，并将其赋值给 app 变量
  const logger = new Logger(); // 创建了一个新的 Logger 实例，用于记录应用程序的日志
  const configService = app.get(ConfigService); // 获取 ConfigService 实例
  const port = configService.get<number>('PORT') || 3000; // 获取端口号，默认为 3000

  app.enableCors(); // 启用了跨域资源共享 (CORS) 支持，允许从其他域名访问该 Nest.js 应用程序
  app.useGlobalPipes(new ValidationPipe()); // 使用全局管道 ValidationPipe 进行请求参数验证

  await app.listen(port); // 监听应用端口
  logger.log(`Application listening on port ${port}`); // 输出应用运行的 端口
}

bootstrap(); // 调用 bootstrap 函数启动应用

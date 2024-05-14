import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LessonModule } from './lesson/lesson.module';
import { Lesson } from './lesson/lesson.entity';
import { Student } from './student/student.entity';
import { StudentModule } from './student/student.module';

/*
  总之，AppModule 是 NestJS 应用的主模块，它导入了 TypeORM 模块用于数据库操作，
  GraphQL 模块用于 GraphQL API 的构建，以及其他自定义模块 LessonModule 和 StudentModule。
  
  这些模块的导入使得应用能够在运行时具备数据库访问能力、GraphQL API 和其他自定义功能。
*/

// 这是一个装饰器，用于将类标记为 NestJS 模块
@Module({
  // 这是一个装饰器选项，用于声明当前模块所依赖的其他模块
  imports: [
    // 导入并配置 ConfigModule
    ConfigModule.forRoot({
      /*

        添加 isGlobal: true 之后

        ex. 
          - 直接在lesson.service.ts中使用configService.get<string>('DATABASE_URL')，
            不需要lesson.module.ts的imports里面 显式地 加入ConfigModule

          - 直接在student.service.ts中使用configService.get<string>('DATABASE_URL')，
            不需要student.module.ts的imports里面 显式地 加入ConfigModule
      */
      isGlobal: true, // 设置为全局模块，以便在整个应用中使用
      envFilePath: '.env', // 指定环境变量文件
    }),
    // 这是 TypeORM 模块的初始化设置，用于配置数据库连接。
    // 在这里，配置了连接到一个 MongoDB 数据库的相关信息，包括 MongoDB 的连接 URL、数据同步选项、使用统一的拓扑结构等
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        // 表明使用 MongoDB 数据库
        type: 'mongodb',
        // 从环境变量中获取 MongoDB 数据库的连接 URL
        url: configService.get<string>('DATABASE_URL'),
        // 表示在应用启动时自动创建数据库结构，这在开发环境中很方便，但在生产环境中应该谨慎使用
        synchronize: true,
        // 表示使用 MongoDB 的统一拓扑结构
        useUnifiedTopology: true,
        // 声明了数据库实体类，即数据库中的表或集合
        entities: [Lesson, Student],
      }),
    }),
    // 这是 GraphQL 模块的初始化设置，用于配置 GraphQL 服务
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // 表示使用 Apollo 驱动程序
      driver: ApolloDriver,
      // 表示在应用启动时自动生成 GraphQL Schema 文件
      autoSchemaFile: true
    }),
    // 是另一个模块，它提供了与课程相关的功能和路由
    LessonModule,
    // 这是另一个模块，它提供了与学生相关的功能和路由
    StudentModule
  ],
})
export class AppModule {}


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonResolver } from './lesson.resolver';
import { LessonService } from './lesson.service';
import { Lesson } from './lesson.entity';
import { StudentModule } from '../student/student.module';
@Module({
  // 模块装饰器，标识这是一个 Nest.js 模块
  imports: [
    // 导入 TypeOrmModule，用于数据库操作
    TypeOrmModule.forFeature([Lesson]), // 导入特定实体（Lesson）的 TypeOrm 模块
    StudentModule, // 导入学生模块，如果不添加此行，则无法查询学生信息
  ],
  // 提供者数组，提供该模块中需要的依赖项
  providers: [
    LessonResolver, // 提供课程解析器，用于处理 GraphQL 请求
    LessonService, // 提供课程服务，用于处理业务逻辑
  ]
})
export class LessonModule {} // 导出课程模块

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './student.service';
import { Student } from './student.entity';
import { StudentResolver } from './student.resolver';

@Module({
  // 模块装饰器，标识这是一个 Nest.js 模块
  imports: [
    // 导入 TypeOrmModule，用于数据库操作
    TypeOrmModule.forFeature([Student]), // 导入特定实体（Student）的 TypeOrm 模块
  ],
  // 提供者数组，提供该模块中需要的依赖项
  providers: [
    StudentResolver, // 提供学生解析器，用于处理 GraphQL 请求
    StudentService, // 提供学生服务，用于处理业务逻辑
  ],
  // 导出提供者，使其可在其他模块中使用
  exports: [StudentService]
})
export class StudentModule {} // 导出学生模块

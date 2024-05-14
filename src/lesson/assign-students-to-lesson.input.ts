/* eslint-disable @typescript-eslint/no-unused-vars */
import { InputType, Field, ID } from '@nestjs/graphql'; // 导入 NestJS 中用于 GraphQL 的 InputType、Field 和 ID 装饰器
import { IsUUID } from 'class-validator'; // 导入 class-validator 中的 IsUUID 装饰器

// 定义一个用于将学生分配到课程的输入类型
@InputType()
export class AssignStudentsToLessonInput {
  // 标记 lessonId 字段为 UUID 类型，并将其映射到 GraphQL 的 ID 类型
  @IsUUID() // 使用 class-validator 库验证该字段为 UUID
  @Field(type => ID)
  lessonId: string; // 存储课程 ID

  // 标记 studentIds 字段为 UUID 类型的数组，并将其映射到 GraphQL 的 ID 类型的数组
  @IsUUID('4', { each: true }) // 使用 class-validator 库验证每个元素为 UUID
  @Field(type => [ID])
  studentIds: string[]; // 存储学生 ID 的数组
}

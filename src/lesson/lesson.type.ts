import { ObjectType, Field, ID } from '@nestjs/graphql';
import { StudentType } from '../student/student.type';

@ObjectType('Lesson') // 将此类标记为 GraphQL 中的对象类型，名称为 'Lesson'
export class LessonType {
  @Field(type => ID) // 声明 id 字段，并指定其类型为 ID
  id: string;

  @Field() // 声明 name 字段
  name: string;

  @Field() // 声明 startDate 字段
  startDate: string;

  @Field() // 声明 endDate 字段
  endDate: string;

  @Field(type => [StudentType]) // 声明 students 字段，并指定其类型为 StudentType 数组
  students: string[]; // 注意：这里的类型应该与 StudentType 中定义的类型相匹配
}

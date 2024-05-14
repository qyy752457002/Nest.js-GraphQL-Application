import { ObjectType, Field } from '@nestjs/graphql';

// 定义 GraphQL 中的 Student 类型
@ObjectType('Student')
export class StudentType {

  // 表示该字段为 GraphQL 中的字段，并指定其类型为字符串
  @Field()
  id: string; // 学生的唯一标识符

  // 表示该字段为 GraphQL 中的字段，并指定其类型为字符串
  @Field()
  firstName: string; // 学生的名字

  // 表示该字段为 GraphQL 中的字段，并指定其类型为字符串
  @Field()
  lastName: string; // 学生的姓氏
}

import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

// 输入类型装饰器，指明这是一个 GraphQL 输入类型
@InputType()
export class CreateStudentInput {
  // 最小长度验证器，要求输入的字符串长度至少为1
  @MinLength(1)
  // 字段装饰器，将该属性暴露为 GraphQL 字段
  @Field()
  firstName: string;

  // 最小长度验证器，要求输入的字符串长度至少为1
  @MinLength(1)
  // 字段装饰器，将该属性暴露为 GraphQL 字段
  @Field()
  lastName: string;
}
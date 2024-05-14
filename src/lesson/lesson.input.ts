import { InputType, Field, ID } from '@nestjs/graphql'; // 导入 NestJS 中用于 GraphQL 的 InputType、Field 和 ID 装饰器
import { MinLength, IsDateString, IsUUID } from 'class-validator'; // 导入 class-validator 中的 MinLength、IsDateString 和 IsUUID 装饰器

@InputType() // 将该类标记为一个 GraphQL 输入类型
export class CreateLessonInput {
  // 创建一个名为 CreateLessonInput 的类
  @MinLength(1) // 使用 MinLength 装饰器来验证属性值的最小长度为 1
  @Field() // 标记该属性为 GraphQL 中的字段
  name: string; // 课程名称，类型为字符串

  @IsDateString() // 使用 IsDateString 装饰器来验证属性值是否为合法的日期字符串
  @Field() // 标记该属性为 GraphQL 中的字段
  startDate: string; // 课程开始日期，类型为字符串

  @IsDateString() // 使用 IsDateString 装饰器来验证属性值是否为合法的日期字符串
  @Field() // 标记该属性为 GraphQL 中的字段
  endDate: string; // 课程结束日期，类型为字符串

  /*
    @IsUUID("4", { each: true }): 这是一个使用了 class-validator 库提供的装饰器 @IsUUID，用于验证一个属性的值是否符合 UUID v4 的格式。
    在这里， { each: true } 表示该验证器会应用在数组的每个元素上，而不是整个数组。
    这意味着它会检查数组中的每个字符串元素是否符合 UUID v4 的格式。
  */
  @IsUUID('4', { each: true }) // 验证学生ID数组中的每个元素是否为 UUID v4 格式

  /*
    @Field(() => [ID], { defaultValue: [] }): 这是 GraphQL 中的字段装饰器 @Field，用于指定一个字段是 GraphQL 查询中的一个可选字段。
    在这里，() => [ID] 指定了这个字段的类型为 ID 类型的数组。
    { defaultValue: [] } 表示如果没有提供该字段的值，它将默认为空数组。
  */
  @Field(() => [ID], { defaultValue: [] }) // 标记该属性为 GraphQL 中的字段，类型为 ID 类型的数组，默认值为空数组
  students: string[]; // 参与课程的学生ID数组
}

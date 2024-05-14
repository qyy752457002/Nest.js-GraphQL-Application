import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { StudentType } from './student.type';
import { CreateStudentInput } from './create-student.input';
import { StudentService } from './student.service';

// 定义一个Resolver类，处理与 StudentType 相关的 GraphQL 请求，返回与 StudentType 相关的数据
@Resolver(of => StudentType)
export class StudentResolver {
  constructor(
    private studentService: StudentService, // 注入学生服务
  ) {}

  // 查询单个学生信息
  // 返回类型 StudentType
  @Query(returns => StudentType)
  async student(
    @Args('id') id: string, // 参数 id：学生的唯一标识符
  ) {
    return this.studentService.getStudent(id); // 调用服务层方法获取学生信息
  }

  // 查询所有学生信息
  // 返回类型 [StudentType]
  @Query(returns => [StudentType])
  async students() {
    return this.studentService.getStudents(); // 调用服务层方法获取所有学生信息
  }

  // 创建新学生
  // 返回类型 StudentType
  @Mutation(returns => StudentType)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput, // 参数 createStudentInput：包含新学生信息的输入对象
  ) {
    return this.studentService.createStudent(createStudentInput); // 调用服务层方法创建新学生
  }
}

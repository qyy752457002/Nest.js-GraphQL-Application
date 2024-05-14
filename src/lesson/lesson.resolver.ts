import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';
import { Lesson } from './lesson.entity';
import { StudentService } from '../student/student.service';

// 定义一个解析器类，处理与 LessonType 相关的 GraphQL 请求，返回与 LessonType 相关的数据
@Resolver(of => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService, // 注入课程服务
    private studentService: StudentService, // 注入学生服务
  ) {}

  // 查询单个课程
  // 返回类型 LessonType
  @Query(returns => LessonType)
  lesson(
    @Args('id') id: string, // 参数：课程 ID
  ) {
    return this.lessonService.getLesson(id); // 调用服务层方法获取指定 ID 的课程信息
  }

  // 查询所有课程
  // 返回类型 [LessonType]
  @Query(returns => [LessonType])
  lessons() {
    return this.lessonService.getLessons(); // 调用服务层方法获取所有课程信息
  }

  // 创建新课程
  // 返回类型 LessonType
  @Mutation(returns => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput, // 参数：查询参数输入对象类型 CreateLessonInput
  ) {
    return this.lessonService.createLesson(createLessonInput); // 调用服务层方法创建课程
  }

  // 将学生分配到课程
  // 返回类型 LessonType
  @Mutation(returns => LessonType)
  assignStudentsToLesson(
    @Args('assignStudentsToLessonInput')
    assignStudentsToLessonInput: AssignStudentsToLessonInput, // 参数：查询参数输入对象类型 AssignStudentsToLessonInput
  ) {
    const { lessonId, studentIds } = assignStudentsToLessonInput; // 解构赋值获取课程 ID 和学生 ID 列表
    return this.lessonService.assignStudentsToLesson(lessonId, studentIds); // 调用服务层方法将学生分配到课程
  }

  // 解析课程对象中的学生字段
  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    /* 
      @Parent() 装饰器用于在解析器中获取父对象的实例，以便在解析字段时使用。

      在这个例子中，它被用于获取包含学生信息的课程对象，以便在 students() 方法中调用 this.studentService.getManyStudents(lesson.students) 来获取课程中学生的详细信息
    */
    return this.studentService.getManyStudents(lesson.students); // 调用学生服务获取课程中学生的详细信息
  }
}

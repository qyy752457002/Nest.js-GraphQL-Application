import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {

  /*
    Repository<Lesson> 中的 <Lesson> 是 TypeScript 中的泛型，
    <Lesson> 表示将 Lesson 类型作为 Repository 类的类型参数
  */

  /*
    这个装饰器告诉 Nest.js 在实例化当前类时自动注入一个 LessonRepository 实例，
    并将其绑定到 lessonRepository 变量上，以便在当前类中进行数据库操作
  */
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>, // 使用 InjectRepository 装饰器注入 Lesson 实体的 Repository
  ) {}

  /*
    Promise<Lesson> 中的 <Lesson> 是 TypeScript 中的泛型，
    <Lesson> 表示将 Lesson 类型作为 Promise 类的类型参数
  */

  // 根据课程 ID 获取课程信息
  async getLesson(id: string): Promise<Lesson> {
    return this.lessonRepository.findOne({ where: { id } });
  }

  // 获取所有课程信息
  async getLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  // 创建新的课程
  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, students } = createLessonInput;

    // 使用 uuid 生成唯一的课程 ID
    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students
    });

    // 保存课程到数据库中，并返回保存后的课程信息
    return this.lessonRepository.save(lesson);
  }

  // 将学生分配到指定课程中
  async assignStudentsToLesson(
    lessonId: string,
    studentIds: string[],
  ): Promise<Lesson> {
    // 根据课程 ID 获取课程信息
    const lesson = await this.lessonRepository.findOne({
      where: { id: lessonId },
    });
    // 将新的学生 ID 添加到课程的学生列表中
    lesson.students = [...lesson.students, ...studentIds];
    // 保存更新后的课程信息，并返回保存后的课程信息
    return this.lessonRepository.save(lesson);
  }
}

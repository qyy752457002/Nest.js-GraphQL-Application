import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid'; // 导入 UUID 生成器
import { Repository, In } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';

@Injectable() // 定义一个Injectable类，声明该类为可注入的服务
export class StudentService {
  
  /*
    这个装饰器告诉 Nest.js 在实例化当前类时自动注入一个 StudentRepository 实例，
    并将其绑定到 studentRepository 变量上，以便在当前类中进行数据库操作
  */
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>, // 使用依赖注入获取 Student 实体的仓库
  ) {}
  
  // 根据学生 ID 获取学生信息
  async getStudent(id: string): Promise<Student> {
    return this.studentRepository.findOne({ where: { id } });
  }

  // 获取所有学生信息
  async getStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  // 创建学生信息
  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName } = createStudentInput;

    // 创建学生对象，分配 UUID 作为学生 ID
    const student = this.studentRepository.create({
      id: uuid(), // 使用 UUID 生成器生成唯一 ID
      firstName,
      lastName
    });

    // 将学生信息保存到数据库并返回保存的学生信息
    return this.studentRepository.save(student);
  }

  // 根据多个学生 ID 获取多个学生信息
  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    return this.studentRepository.find({
      where: {
        id: In(studentIds), // 使用 In 查询多个学生 ID
      }
    });
  }
}

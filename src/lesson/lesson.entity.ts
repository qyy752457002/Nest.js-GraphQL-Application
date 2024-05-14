import { Entity, PrimaryColumn, Column, ObjectIdColumn } from 'typeorm';

// 定义一个实体类，表示课程
@Entity()
export class Lesson {
  // 标记 _id 字段为 MongoDB 的 ObjectId
  @ObjectIdColumn()
  _id: string; // MongoDB 中的课程 ID

  // 标记 id 字段为主键
  @PrimaryColumn()
  id: string; // 课程的唯一标识

  // 标记 name 字段为普通列
  @Column()
  name: string; // 课程名称

  // 标记 startDate 字段为普通列
  @Column()
  startDate: string; // 课程开始日期

  // 标记 endDate 字段为普通列
  @Column()
  endDate: string; // 课程结束日期

  // 标记 students 字段为普通列
  @Column()
  students: string[]; // 参与该课程的学生列表
}

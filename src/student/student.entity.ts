import { Entity, ObjectIdColumn, PrimaryColumn, Column } from 'typeorm';

// 实体装饰器，指明这是一个实体类
@Entity()
export class Student {
  // 对象ID列装饰器，指明这是一个对象ID列
  @ObjectIdColumn()
  // MongoDB中的文档ID
  _id: string;

  // 主列装饰器，指明这是主要列
  @PrimaryColumn()
  // 学生ID
  id: string;

  // 列装饰器，指明这是一个列
  @Column()
  // 名字
  firstName: string;

  // 列装饰器，指明这是一个列
  @Column()
  // 姓氏
  lastName: string;
}

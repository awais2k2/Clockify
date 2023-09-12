import { User } from 'src/typeorm/entities/user';
import { Project } from './project';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Reporting } from './reporting';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  assigness: string;

  @Column({ default: false })
  done: boolean;

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;

  @ManyToMany(() => User, (user) => user.taskAssigned)
  @JoinTable()
  userToAssign: User[];

  @OneToMany(() => Reporting, (reporting) => reporting.task)
  reportings: Reporting[];
}

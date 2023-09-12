import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { User } from './user';
import { Task } from './task';
import { Project } from './project';

@Entity('reporting')
export class Reporting {
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  discription: string;

  @Column()
  starttime: string;

  @Column()
  endtime: string;

  @Column()
  totaltime: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  Date: Date;

  @ManyToOne(() => User, (user) => user.reportings)
  user: User;

  @ManyToOne(() => Task, (task) => task.reportings)
  task: Task;

  @ManyToOne(() => Project, (project) => project.reportings)
  project: Project;

  @Column({ default: false })
  isbillable: boolean;
}

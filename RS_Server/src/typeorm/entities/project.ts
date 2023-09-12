import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user';
import { Task } from './task';
import { Reporting } from './reporting';
import { Client } from './client';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  isArchived: boolean;

  @Column({ default: false })
  done: boolean;

  @ManyToOne(() => Client, (client) => client.project)
  client: Client;

  @Column({ default: false })
  public: boolean;

  @Column({ default: false })
  archive: boolean;

  @Column({ default: '#000000' })
  statuscolor: string;

  @ManyToOne(() => User, (user) => user.projects)
  user: User;

  @OneToMany(() => Task, (Task) => Task.project)
  tasks: Task[];

  @OneToMany(() => Reporting, (reporting) => reporting.project)
  reportings: Reporting[];
}

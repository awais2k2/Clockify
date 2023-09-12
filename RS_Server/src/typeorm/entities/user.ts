import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Project } from './project';
import { Client } from './client';
import { Member } from './member';
import { Task } from './task';
import { Reporting } from './reporting';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'Owner' })
  role: string;

  @ManyToMany(() => User, (user) => user.members)
  @JoinTable()
  members: User[];

  @OneToMany(() => Reporting, (reporting) => reporting.user)
  reportings: Reporting[];

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @OneToMany(() => Client, (client) => client.user)
  clients: Client[];

  @ManyToMany(() => Task, (task) => task.userToAssign)
  taskAssigned: Task[];

  @Column({ default: true })
  isUser: boolean;
}

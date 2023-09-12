import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './user';
import { Project } from './project';

@Entity('client')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => User, (user) => user.clients)
  user: User;

  @ManyToMany(() => Project, (project) => project.client)
  @JoinColumn()
  project: Project[];
}

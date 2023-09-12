import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.members)
  user: User;

  // @ManyToOne(() => User, (user) => user.invitedMembers)
  // inviter: User;
}

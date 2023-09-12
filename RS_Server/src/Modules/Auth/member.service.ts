import { BadRequestException } from '@nestjs/common/exceptions';
import { Member } from '../../typeorm/entities/member';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user';
@Injectable()
export class MemberServices {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(userId: number, inviterId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['members'],
    });
    const inviter = await this.userRepository.findOne({
      where: { id: inviterId },
    });

    // Check if user.members is undefined and initialize it as an empty array
    if (!user.members) {
      user.members = [];
    }
    user.members.map((user) => {
      if (user.email === inviter.email) {
        throw new BadRequestException('Member already exist');
      }
    });

    user.members.push(inviter);

    const userMember = await this.userRepository.save(user);
    return userMember;
  }

  async findMembers(id: number): Promise<User[]> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['members'],
    });

    const members = user.members;
    return members;
  }
}

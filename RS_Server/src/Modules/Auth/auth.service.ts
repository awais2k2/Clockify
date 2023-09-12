import { User } from '../../typeorm/entities/user';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthServices {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findUser(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async create(data: any): Promise<User> {
    const newUser = await this.userRepository.save(data);
    return newUser;
  }

  async findOneid(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['projects', 'members'],
      });

      return user;
    } catch (e) {
      console.log(e);
    }
  }

  async findOne(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async updatePassword(email: string, newPassword: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new Error('User not found');
    }

    user.password = newPassword;
    user.isUser = true;
    return this.userRepository.save(user);
  }
  async update(data: any) {
    await this.userRepository.save(data);
  }
}

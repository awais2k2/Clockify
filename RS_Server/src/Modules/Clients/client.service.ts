// import { User } from '../../typeorm/entities/user';
// import { Project } from 'src/typeorm/entities/project';
import { Client } from 'src/typeorm/entities/client';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findClients(id: number): Promise<Client[]> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['clients'],
    });

    const clients = user.clients;
    return clients;
  }

  async create(data: any): Promise<Client> {
    const user = await this.userRepository.findOneBy({ id: data.id });
    const newClient = new Client();
    newClient.name = data.name;
    newClient.user = user;
    const savedClient = await this.clientRepository.save(newClient);
    return savedClient;
  }

  async find(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  async findProjectByName(name: string): Promise<Client> {
    return await this.clientRepository.findOne({ where: { name } });
  }

  //   async findOne(email: string): Promise<Project> {
  //     // return this.projectRepository.find();
  //   }
}

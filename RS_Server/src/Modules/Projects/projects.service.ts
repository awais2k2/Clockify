import { Client } from 'src/typeorm/entities/client';
// import { User } from '../../typeorm/entities/user';
import { Project } from 'src/typeorm/entities/project';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user';
import { Task } from 'src/typeorm/entities/task';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Client) private clientRepository: Repository<Client>,
  ) {}

  async findProjects(id: number): Promise<Project[]> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['projects', 'projects.client', 'projects.tasks'],
    });
    const projects = user.projects;
    return projects;
  }

  async findProjectTasks(id: number): Promise<Task[]> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['tasks', 'tasks.userToAssign'],
    });
    const tasks = project.tasks;
    return tasks;
  }

  async createProjects(data: any): Promise<Project> {
    const user = await this.userRepository.findOneBy({ id: data.id });

    //Client
    const alreadyClient = await this.clientRepository.findOne({
      where: { name: data.client },
    });

    const newProject = new Project();
    newProject.name = data.name;
    newProject.statuscolor = data.color;
    newProject.public = data.isVerified;
    if (alreadyClient) {
      newProject.client = alreadyClient;
    } else {
      const client = new Client();
      client.name = data.client;
      client.user = user;
      await this.clientRepository.save(client);
      newProject.client = client;
    }
    newProject.user = user;

    const savedProject = await this.projectRepository.save(newProject);
    return savedProject;
  }

  async findProjectByName(name: string): Promise<Project> {
    return await this.projectRepository.findOne({ where: { name } });
  }

  async findProjectByid(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
    return project;
  }
  async findPro(id: number): Promise<Project> {
    const project = await this.projectRepository.findOneBy({ id });
    return project;
  }

  //   async findOne(email: string): Promise<Project> {
  //     // return this.projectRepository.find();
  //   }
}

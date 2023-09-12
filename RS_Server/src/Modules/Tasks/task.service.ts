import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/typeorm/entities/task';
import { Project } from 'src/typeorm/entities/project';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  findUser(id: number): Promise<Task> {
    return this.taskRepository.findOneBy({ id });
  }

  async create(data: any): Promise<Task> {
    const id = parseInt(data.id);
    const project = await this.projectRepository.findOneBy({ id });
    if (project) {
      const newTask = new Task();
      newTask.name = data.name;
      newTask.project = project;
      const savedClient = await this.taskRepository.save(newTask);
      return savedClient;
    } else {
      return null;
    }
  }

  async find(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findProjectByName(name: string): Promise<Task> {
    return await this.taskRepository.findOne({ where: { name } });
  }

  async findbyid(data: any): Promise<Task> {
    return await this.taskRepository.findOne({
      where: { id: data.id },
    });
  }
  async update(data: any): Promise<Task> {
    return await this.taskRepository.save(data);
  }
}

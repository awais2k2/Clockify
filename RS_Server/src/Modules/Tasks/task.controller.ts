import { AuthServices } from './../Auth/auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { TasktDto } from 'src/dto/task.dto';
import { TasksService } from './task.service';
import { ProjectService } from '../Projects/projects.service';

@Controller('projects/tasks')
export class TaskController {
  constructor(
    private readonly taskservice: TasksService,
    private readonly projectservice: ProjectService,
    private readonly authservice: AuthServices,
  ) {}

  @Post()
  async createTask(@Body() data: TasktDto) {
    const id = data.id;
    const project = await this.projectservice.findPro(id);
    if (project) {
      const tasks = project.tasks;
      if (tasks) {
        tasks.map((item) => {
          if (item.name === data.name) {
            throw new HttpException(
              'Project already exists',
              HttpStatus.BAD_REQUEST,
            );
          }
        });
      } else {
        return await this.taskservice.create(data);
      }
    } else {
      throw new HttpException('Project Not Found', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id/tasks')
  async getProject(@Param('id') projectId: string) {
    const id = parseInt(projectId);
    return await this.projectservice.findProjectTasks(id);
  }

  @Post('assign-task')
  async assignTasks(@Body() data: any) {
    const task = await this.taskservice.findbyid({ id: data.taskId });

    const Users = [];
    for (const id of data.members) {
      const User = await this.authservice.findUser(id);
      Users.push(User);
    }
    task.userToAssign = Users;
    await this.taskservice.update(task);
    return task;
  }
}

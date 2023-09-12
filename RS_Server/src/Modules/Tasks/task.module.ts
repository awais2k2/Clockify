import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { TasksService } from './task.service';
import { Project } from 'src/typeorm/entities/project';
import { Task } from 'src/typeorm/entities/task';
import { ProjectService } from '../Projects/projects.service';
import { User } from 'src/typeorm/entities/user';
import { AuthServices } from '../Auth/auth.service';
import { ClientsService } from '../Clients/client.service';
import { Client } from 'src/typeorm/entities/client';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Task, User, Client])],
  controllers: [TaskController],
  providers: [TasksService, ProjectService, AuthServices, ClientsService],
})
export class TaskModule {}

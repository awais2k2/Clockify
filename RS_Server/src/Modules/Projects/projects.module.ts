import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/typeorm/entities/project';
import { ProjectController } from './projects.controller';
import { ProjectService } from './projects.service';
import { User } from 'src/typeorm/entities/user';
import { Task } from 'src/typeorm/entities/task';
import { AuthServices } from '../Auth/auth.service';
import { Client } from 'src/typeorm/entities/client';

@Module({
  imports: [TypeOrmModule.forFeature([Project, User, Task, Client])],
  controllers: [ProjectController],
  providers: [ProjectService, AuthServices],
})
export class ProjectModule {}

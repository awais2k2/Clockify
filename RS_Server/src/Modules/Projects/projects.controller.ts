import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { HttpStatus, HttpException } from '@nestjs/common';
import { ProjectService } from './projects.service';
import { ProjectDta } from 'src/dto/project.dto';
import { AuthServices } from '../Auth/auth.service';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectservice: ProjectService,
    private readonly authservice: AuthServices,
  ) {}

  @Post()
  async CreateProjects(@Body() data: ProjectDta) {
    const user = await this.authservice.findOneid(data.id);
    const userProjects = user.projects;
    console.log(userProjects);
    if (userProjects) {
      userProjects.map((project) => {
        if (project.name === data.name) {
          throw new HttpException(
            'Project already exists',
            HttpStatus.BAD_REQUEST,
          );
        }
      });
    }

    return this.projectservice.createProjects(data);
  }

  @Post('projects')
  async GetProject(@Body() userId: any) {
    const id = userId.userId;
    return await this.projectservice.findProjects(id);
  }

  @Get(':id')
  async getProject(@Param('id') projectId: string) {
    const id = parseInt(projectId);
    const project = await this.projectservice.findProjectByid(id);
    if (project) return project;
  }
}

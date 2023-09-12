import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientController } from './client.controller';
import { ClientsService } from './client.service';
import { Client } from 'src/typeorm/entities/client';
import { User } from 'src/typeorm/entities/user';
import { Project } from 'src/typeorm/entities/project';
import { ProjectService } from '../Projects/projects.service';
import { AuthServices } from '../Auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Client, User, Project])],
  controllers: [ClientController],
  providers: [ClientsService, ProjectService, AuthServices],
})
export class ClientModule {}

import { Reporting } from './../typeorm/entities/reporting';
import { Member } from './../typeorm/entities/member';
import { Task } from './../typeorm/entities/task';
import { Client } from './../typeorm/entities/client';
import { Project } from './../typeorm/entities/project';
import { User } from './../typeorm/entities/user';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const DatabaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Project, Client, Task, Member, Reporting],
  synchronize: false,
};

import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/typeorm/entities/project';
import { Module } from '@nestjs/common';
import { ReportingService } from './reporting.service';
import { ReportingController } from './reporting.controller';
import { Task } from 'src/typeorm/entities/task';
import { User } from 'src/typeorm/entities/user';
import { Reporting } from 'src/typeorm/entities/reporting';

@Module({
  imports: [TypeOrmModule.forFeature([Project, User, Task, Reporting])],
  providers: [ReportingService],
  controllers: [ReportingController],
})
export class ReportingModule {}

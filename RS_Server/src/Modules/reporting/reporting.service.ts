import { Task } from 'src/typeorm/entities/task';
import { Project } from 'src/typeorm/entities/project';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Reporting } from 'src/typeorm/entities/reporting';
import { User } from 'src/typeorm/entities/user';

@Injectable()
export class ReportingService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Reporting)
    private reportingRepository: Repository<Reporting>,
  ) {}

  async create(data: any) {
    const user = await this.userRepository.findOne({
      where: { id: data.userId },
    });

    const project = await this.projectRepository.findOne({
      where: { id: data.projectId },
    });

    if (!user || !project) {
      throw new Error('User or Project not found.'); // Handle the case if entities are not found
    }

    let task = null;
    if (data.taskId !== null) {
      task = await this.taskRepository.findOne({
        where: { id: data.taskId },
      });
    }

    const reporting = new Reporting();
    reporting.discription = data.dis;
    reporting.endtime = data.endtime;
    reporting.starttime = data.starttime;
    reporting.totaltime = data.totaltime;
    reporting.isbillable = data.isbillable;
    reporting.user = user;
    reporting.project = project;
    if (task !== null) {
      reporting.task = task;
    }
    if (data.date) {
      reporting.Date = data.date;
    }

    await this.reportingRepository.save(reporting);
    return reporting;
  }

  async deleteReport(id: number) {
    await this.reportingRepository.delete(id);
  }

  async updateDis(data: any) {
    const id = data.id;
    const report = await this.reportingRepository.findOne({ where: { id } });
    report.discription = data.dis;
    return await this.reportingRepository.save(report);
  }

  async updateBillable(data: any) {
    const id = data.id;
    const report = await this.reportingRepository.findOne({ where: { id } });
    report.isbillable = data.billable;
    return await this.reportingRepository.save(report);
  }

  async findUserReports(id: number): Promise<Reporting[]> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: [
        'reportings',
        'reportings.project',
        'reportings.task',
        'reportings.project.client',
      ],
    });
    const reports = user.reportings;
    return reports;
  }
}

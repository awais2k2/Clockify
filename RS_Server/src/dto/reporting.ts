import { IsNotEmpty } from 'class-validator';

export class ReportingDto {
  dis: string;
  starttime: number;
  endtime: number;
  totaltime: number;
  Date: Date;
  isbillable: boolean;
  user: number;
  task: number;
  project: number;
}

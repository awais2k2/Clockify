import { BadRequestException } from '@nestjs/common/exceptions';
import { ReportingService } from './reporting.service';
import { Body, Controller, Get, Post, Delete, Param } from '@nestjs/common';

@Controller('reporting')
export class ReportingController {
  constructor(private reportingservice: ReportingService) {}
  @Post()
  async create(@Body() data: any) {
    return await this.reportingservice.create(data);
  }

  @Post('/dis')
  async updateDis(@Body() data: { id: number; dis: string }) {
    return await this.reportingservice.updateDis(data);
  }

  @Post('/billable')
  async updateBillable(@Body() data: { id: number; billable: boolean }) {
    return await this.reportingservice.updateBillable(data);
  }

  @Get(':id/trackings')
  async getProject(@Param('id') userId: string) {
    const id = parseInt(userId);
    return await this.reportingservice.findUserReports(id);
  }

  @Delete()
  async delete(@Body() data: { id: number }) {
    if (data && data.id) {
      await this.reportingservice.deleteReport(data.id);
    } else {
      throw new BadRequestException('Missing id in request body');
    }
  }
}

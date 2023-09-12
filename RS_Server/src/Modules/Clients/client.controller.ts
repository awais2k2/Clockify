import {
  Body,
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientsService } from './client.service';
import { ClientDto } from 'src/dto/client.dto';
@Controller('client')
export class ClientController {
  constructor(private readonly clientservice: ClientsService) {}

  @Post()
  async createClient(@Body() data: ClientDto) {
    const client = await this.clientservice.findProjectByName(data.name);
    if (client) {
      throw new HttpException('Client already exists', HttpStatus.BAD_REQUEST);
    }
    return this.clientservice.create(data);
  }

  @Post('clients')
  async findUserClients(@Body() userId: any) {
    const id = userId.userId;
    return await this.clientservice.findClients(id);
  }

  @Get()
  getClient() {
    return this.clientservice.find();
  }
}

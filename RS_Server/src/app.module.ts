import { ProjectModule } from './Modules/Projects/projects.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './Modules/Auth/auth.module';
import { ClientModule } from './Modules/Clients/client.module';
import { DatabaseConfig } from './Database/databaseConfig';
import { TaskModule } from './Modules/Tasks/task.module';
import { ReportingModule } from './modules/reporting/reporting.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseConfig),
    AuthModule,
    ProjectModule,
    ClientModule,
    TaskModule,
    ReportingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

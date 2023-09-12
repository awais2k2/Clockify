import { Project } from 'src/typeorm/entities/project';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthServices } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/typeorm/entities/user';
import { JwtModule } from '@nestjs/jwt/dist';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AuthMiddleware } from './auth.middleware';
import { Task } from 'src/typeorm/entities/task';
import { Member } from 'src/typeorm/entities/member';
import { MemberServices } from './member.service';
import { EmailService } from './email.service';
import { ProjectService } from '../Projects/projects.service';
import { Client } from 'src/typeorm/entities/client';
import { ClientsService } from '../Clients/client.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Project, Task, Member, Client]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthServices,
    MemberServices,
    EmailService,
    ProjectService,
    ClientsService,
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('api/user');
  }
}

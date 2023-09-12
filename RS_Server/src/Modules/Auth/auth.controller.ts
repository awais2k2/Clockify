// import { MemberServices } from './member.service';
import { LoginDto } from '../../dto/login.dto';
import { RegisterDto } from '../../dto/register.dto';
import {
  Body,
  Controller,
  Post,
  Res,
  Req,
  Get,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthServices } from './auth.service';
import { EmailService } from './email.service';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { MemberServices } from './member.service';

@Controller('api')
export class AuthController {
  constructor(
    private readonly authservice: AuthServices,
    private jwtservice: JwtService,
    private emailService: EmailService,
    private memberService: MemberServices,
  ) {}

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() registerData: RegisterDto) {
    const user = await this.authservice.findOne(registerData.email);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(registerData.password, 12);
    registerData.password = hashedPassword;
    const registerUser = this.authservice.create(registerData);
    return registerUser;
  }

  @Post('login')
  async login(
    @Body() loginData: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authservice.findOne(loginData.email);
    if (!user) {
      throw new BadRequestException('Invalid Credential');
    }

    if (!(await bcrypt.compare(loginData.password, user.password))) {
      throw new BadRequestException('Invalid Credential');
    }

    const jwt = await this.jwtservice.signAsync({ id: user.id });
    return {
      token: jwt,
      message: 'success',
    };
  }

  @Get('user')
  async user(@Req() request: Request) {
    const user = request['user'];

    return user;
  }

  @Post('/send-link')
  async sendmail(@Body() data: any) {
    const checkuser = await this.authservice.findOne(data.to);

    if (checkuser) {
      return await this.memberService.create(data.id, checkuser.id);
    }
    const password = Math.random().toString(36).substr(2, 9);
    const role = 'User';
    const user = {
      email: data.to,
      password,
      role,
      isUser: false,
    };

    const memberUser = await this.authservice.create(user);
    await this.memberService.create(data.id, memberUser.id);
    await this.emailService.sendEmail(
      data.to,
      data.subject,
      data.text,
      data.from,
    );
  }

  @Post('update-password')
  async updatePassword(@Body() updatePasswordDto: RegisterDto) {
    let { email, password } = updatePasswordDto;
    password = await bcrypt.hash(updatePasswordDto.password, 12);
    return this.authservice.updatePassword(email, password);
  }

  @Post('members')
  async findUserClients(@Body() userId: any) {
    const id = userId.userId;
    return await this.memberService.findMembers(id);
  }
}

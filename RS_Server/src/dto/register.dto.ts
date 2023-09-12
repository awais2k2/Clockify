import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'User Should have @ in email' })
  @IsEmail()
  email: string;

  @Length(8, 15, { message: 'Pin Should be Equal to 4' })
  @IsNotEmpty({ message: 'User Should have pin' })
  password: string;
}

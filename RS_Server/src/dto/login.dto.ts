import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'User Should have phone' })
  email: string;

  @IsNotEmpty({ message: 'User Should have pin' })
  password: string;
}

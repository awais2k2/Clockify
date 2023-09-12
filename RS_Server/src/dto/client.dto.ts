import { IsNotEmpty } from 'class-validator';

export class ClientDto {
  @IsNotEmpty({ message: 'User Should have phone' })
  name: string;
}

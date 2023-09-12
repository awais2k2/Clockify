import { IsNotEmpty } from 'class-validator';

export class TasktDto {
  @IsNotEmpty({ message: 'User Should have name' })
  name: string;
  id: number;
}

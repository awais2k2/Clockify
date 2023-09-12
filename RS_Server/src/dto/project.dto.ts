import { IsNotEmpty } from 'class-validator';
export class ProjectDta {
  @IsNotEmpty({ message: 'User Should have phone' })
  name: string;

  client: string;

  id: number;

  public: boolean;
}

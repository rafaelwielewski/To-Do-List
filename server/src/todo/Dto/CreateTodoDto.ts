import { IsNumber, IsNotEmpty, IsString, IsBoolean  } from 'class-validator';
             
export class CreateTodoDto {

  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  listId: number;

  @IsNotEmpty()
  task: string;

  @IsNotEmpty()
  order: string;

  @IsBoolean()
  completed: boolean;
}

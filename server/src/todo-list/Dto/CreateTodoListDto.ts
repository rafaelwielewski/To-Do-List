import { IsNumber, IsNotEmpty, IsString, IsBoolean  } from 'class-validator';
             
export class CreateTodoListDto {

  @IsNumber()
  listId: number;

  @IsNumber()
  userId: number;

  @IsNotEmpty()
  title: string;

}

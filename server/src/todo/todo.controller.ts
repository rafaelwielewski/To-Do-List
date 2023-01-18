import { Controller, Get, Post, Body, Request, Delete, Param, ParseArrayPipe, ParseUUIDPipe, ParseIntPipe } from '@nestjs/common';
import { CreateTodoDto } from './Dto/CreateTodoDto';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(
    @Request() request,
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<Todo> {
    return this.todoService.create(createTodoDto);
  }

  @Get(":listId")
  async findAll(
    @Param("listId", ParseIntPipe) listId: number
  ){
    return this.todoService.findAll(listId);
  }

  @Delete(":id")
  async remove(
    @Param("id", ParseUUIDPipe) id: string
  ){

    await this.todoService.remove(id);
    return { id }
  }
}

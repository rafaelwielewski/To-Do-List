import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateTodoListDto } from './Dto/CreateTodoListDto';
import { TodoList } from './entity/todo-list.entity';
import { TodoListService } from './todo-list.service';

@Controller('todo-list')
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}

  @Post()
  async create(
    @Body() createTodoListDto: CreateTodoListDto,
  ): Promise<TodoList> {
    return this.todoListService.create(createTodoListDto);
  }

  @Get(':listId')
  async findOne(
    @Param("listId", ParseIntPipe) listId: number
  ): Promise<TodoList> {
    return this.todoListService.findOne(listId);
  }
}

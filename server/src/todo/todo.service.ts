import { Injectable } from '@nestjs/common';
import { TodoRepository } from '../db/repositories/TodoRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from './Dto/CreateTodoDto';
import { Todo } from './entity/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>,
      ) {}


async create(createTodoDto: CreateTodoDto): Promise<Todo> {

    const { id, listId, task, order, completed } = createTodoDto;

    const todos = new Todo();
    todos.id = id;
    todos.listId = listId;
    todos.task = task;
    todos.order = order;
    todos.completed = completed;

    return this.todoRepository.save(todos);

  }

  async findAll(listId: number) {
    
    return this.todoRepository.find({
      where: {
          listId: listId
      },
  })

  }

  async remove(id: string) {
    return this.todoRepository.delete(id);
  }


}
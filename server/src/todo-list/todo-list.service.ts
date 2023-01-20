import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoListDto } from './Dto/CreateTodoListDto';
import { TodoList } from './entity/todo-list.entity';

@Injectable()
export class TodoListService {
  constructor(
    @InjectRepository(TodoList)
    private todoRepository: Repository<TodoList>,
  ) {}

  async create(createTodoListDto: CreateTodoListDto): Promise<TodoList> {

    const { listId, userId, title } = createTodoListDto;

    const list = new TodoList();
    list.listId = listId;
    list.userId = userId;
    list.title = title;
    console.log(list)
    return this.todoRepository.save(list);
  }

  async findOne(listId: number) {
    return this.todoRepository.findOne({
      where: {
          listId: listId
      },
  })
}

}

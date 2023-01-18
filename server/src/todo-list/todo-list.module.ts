import { Module } from '@nestjs/common';
import { TodoList } from './entity/todo-list.entity';
import { TodoListController } from './todo-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoListService } from './todo-list.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoList]),
  ],
  controllers: [TodoListController],
  providers: [TodoListService]
})
export class TodoListModule {}

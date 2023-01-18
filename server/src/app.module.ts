import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoRepository } from './db/repositories/TodoRepository';
import { Todo } from './todo/entity/todo.entity';
import { TodoListModule } from './todo-list/todo-list.module';
import { TodoList } from './todo-list/entity/todo-list.entity';

@Module({
  imports: [TodoModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'db_todo-list',
      entities: [Todo, TodoList],
      synchronize: true,
    }),
    TodoListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoRepository } from './db/repositories/TodoRepository';
import { Todo } from './todo/entity/todo.entity';
import { TodoListModule } from './todo-list/todo-list.module';
import { TodoList } from './todo-list/entity/todo-list.entity';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
  
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Todo, TodoList,'dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TodoModule,
    TodoListModule,



  // imports: [TodoModule,
  //   TypeOrmModule.forRoot({
  //     type: 'mysql',
  //     host: '127.0.0.1',
  //     port: 3306,
  //     username: 'root',
  //     password: '',
  //     database: 'db_todo-list',
  //     entities: [Todo, TodoList],
  //     synchronize: true,
  //   }),
  //   inject: [ConfigService],
  // }),
  //   TodoModule,
  //   TodoListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

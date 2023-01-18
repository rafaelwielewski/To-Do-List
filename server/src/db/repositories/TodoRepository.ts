import { Entity, Repository } from 'typeorm';
import { Todo } from 'src/todo/entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoRepository extends Repository<Todo> {}

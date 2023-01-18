import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Todo {

  @PrimaryColumn()
  id: string;

  @Column()
  listId: number;

  @Column()
  task: string;

  @Column()
  order: string;

  @Column()
  completed: boolean;

}
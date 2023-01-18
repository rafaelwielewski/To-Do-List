import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class TodoList {

  @PrimaryColumn()
  listId: number;

  @Column()
  userId: number;

  @Column()
  title: string;

}
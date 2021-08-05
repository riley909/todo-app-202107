import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TodosStatus } from './todos-status.enum';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  created: string;

  @Column()
  lastEdited: string;

  @Column()
  ref: string;

  @Column()
  status: TodosStatus;
}

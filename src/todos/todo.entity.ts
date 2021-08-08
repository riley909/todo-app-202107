import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  status: number;
}

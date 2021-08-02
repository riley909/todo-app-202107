import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  created: Date;

  @Column()
  lastEdited: Date;

  @Column()
  ref: string;

  @Column()
  status: boolean;
}

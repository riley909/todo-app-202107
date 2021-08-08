/* eslint-disable @typescript-eslint/no-inferrable-types */
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTodosFilterDto } from './dto/get-todos-filter.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.entity';

@EntityRepository(Todo)
export class TodosRepository extends Repository<Todo> {
  async getTodos(
    filterDto: GetTodosFilterDto,
    page: number = 1,
  ): Promise<Todo[]> {
    const { status, created, search } = filterDto;
    const query = this.createQueryBuilder('todo');

    if (status) {
      query.andWhere('todo.status = :status', { status });
    }

    if (created) {
      query.andWhere('todo.created = :created', { created });
    }

    if (search) {
      query.andWhere('LOWER(todo.content) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }
    const todos = await query.getMany();
    return todos;
  }

  async getTodoById(id: number): Promise<Todo> {
    const found = await this.findOne(id);
    if (!found) {
      throw new NotFoundException(`id ${id} not found`);
    }
    return found;
  }

  getDateFormat(date) {
    const year = date.getFullYear();
    let month = 1 + date.getMonth();
    month = month >= 10 ? month : '0' + month;
    let day = date.getDate();
    day = day >= 10 ? day : '0' + day;
    return `${year}-${month}-${day}`;
  }

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const { content, ref } = createTodoDto;
    const date = this.getDateFormat(new Date());
    const todo = this.create({
      content,
      created: date,
      lastEdited: date,
      ref,
      status: 0,
    });

    await this.save(todo);
    return todo;
  }

  async updateTodo(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const { content, ref } = updateTodoDto;
    const date = this.getDateFormat(new Date());
    const todo = await this.getTodoById(id);
    todo.content = content;
    todo.lastEdited = date;
    todo.ref = ref;
    await this.save(todo);
    return todo;
  }

  async updateTodoStatus(
    id: number,
    updateStatusDto: UpdateStatusDto,
  ): Promise<Todo> {
    const { status } = updateStatusDto;
    const todo = await this.getTodoById(id);
    let refArr;

    if (todo.ref !== '') {
      refArr = todo.ref.split(',');
      refArr.pop();

      for (let i = 0; i < refArr.length; i++) {
        const newTodo = await this.getTodoById(refArr[i]);
        if (newTodo.status === 0) {
          throw new BadRequestException();
        }
      }
    }
    todo.status = status;
    await this.save(todo);
    return todo;
  }
}

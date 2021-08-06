/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@nestjs/common';
import { GetTodosFilterDto } from './dto/get-todos-filter.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.entity';
import { TodosRepository } from './todos.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodosRepository)
    private todosRepository: TodosRepository,
  ) {}

  getTodos(filterDto: GetTodosFilterDto, page: number = 1): Promise<Todo[]> {
    return this.todosRepository.getTodos(filterDto, page);
  }

  getTodoById(id: number): Promise<Todo> {
    return this.todosRepository.getTodoById(id);
  }

  createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todosRepository.createTodo(createTodoDto);
  }

  async deleteTodo(id: number): Promise<void> {
    const todo = this.getTodoById(id);
    await this.todosRepository.delete((await todo).id);
  }

  updateTodo(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return this.todosRepository.updateTodo(id, updateTodoDto);
  }
}

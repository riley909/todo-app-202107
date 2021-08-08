/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTodosFilterDto } from './dto/get-todos-filter.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.entity';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  getTodos(
    @Query() filterDto: GetTodosFilterDto,
    @Query('page') page: number,
  ): Promise<Todo[]> {
    return this.todosService.getTodos(filterDto, page);
  }

  @Get('/:id')
  getTodoById(@Param('id') id: number): Promise<Todo> {
    return this.todosService.getTodoById(id);
  }

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todosService.createTodo(createTodoDto);
  }

  @Delete('/:id')
  deleteTodo(@Param('id') id: number): Promise<void> {
    return this.todosService.deleteTodo(id);
  }

  @Patch('/:id')
  updateTodo(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todosService.updateTodo(id, updateTodoDto);
  }

  @Patch('/:id/status')
  updateTodoStatus(
    @Param('id') id: number,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<Todo> {
    return this.todosService.updateTodoStatus(id, updateStatusDto);
  }
}

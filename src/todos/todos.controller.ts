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
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.entity';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  getTodo(): Promise<Todo[]> {
    return this.todosService.getTodo();
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
}

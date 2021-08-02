import { Controller, Get, Param } from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get('/:id')
  getTodoById(@Param('id') id: number): Promise<Todo> {
    return this.todosService.getTodoById(id);
  }
}

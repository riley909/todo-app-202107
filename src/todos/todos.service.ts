import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
  async getTodoById(id: number): Promise<Todo> {
    const found = await Todo.findOne(id);
    if (!found) {
      throw new NotFoundException(`id${id} not found`);
    }
    return found;
  }
}

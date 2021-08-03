import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
  async getTodoById(id: number): Promise<Todo> {
    const found = await Todo.findOne(id);
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
    const todo = Todo.create({
      content,
      created: date,
      lastEdited: date,
      ref,
      status: 0,
    });

    await Todo.save(todo);
    return todo;
  }

  async deleteTodo(id: number): Promise<void> {
    const todo = this.getTodoById(id);
    await Todo.delete((await todo).id);
  }

  async updateTodo(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const { content, ref } = updateTodoDto;
    const date = this.getDateFormat(new Date());
    const todo = await this.getTodoById(id);
    todo.content = content;
    todo.lastEdited = date;
    todo.ref = ref;
    await Todo.save(todo);
    return todo;
  }
}

import { IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  ref?: string;
}

import { IsOptional, IsString } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  ref?: string;
}

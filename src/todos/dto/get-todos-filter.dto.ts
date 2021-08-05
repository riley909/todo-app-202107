import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TodosStatus } from '../todos-status.enum';

export class GetTodosFilterDto {
  @IsOptional()
  @IsEnum(TodosStatus)
  status?: string;

  @IsOptional()
  @IsString()
  created?: string;

  @IsOptional()
  @IsString()
  search?: string;
}

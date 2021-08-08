import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetTodosFilterDto {
  @IsOptional()
  @IsNumber()
  status?: number;

  @IsOptional()
  @IsString()
  created?: string;

  @IsOptional()
  @IsString()
  search?: string;
}

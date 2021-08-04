import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetTodosFilterDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  status?: number;

  @IsOptional()
  @IsString()
  created?: string;
}

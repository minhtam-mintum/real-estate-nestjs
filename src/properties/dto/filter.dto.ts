import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterPropertiesDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  take?: number;
  @IsOptional()
  @IsString()
  search?: string;
  @IsOptional()
  sort?: string;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  area?: number;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price?: number;
}

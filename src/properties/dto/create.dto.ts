/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { LegalStatus } from 'src/common/enums/propertyStatus.enum';

export class CreatePropertyDto {
  @IsString()
  title!: string;

  @Type(() => Number)
  @IsNumber()
  price!: number;

  @Type(() => Number)
  @IsNumber()
  area!: number;

  @IsString()
  address!: string;

  @IsEnum(LegalStatus)
  legalStatus!: LegalStatus;
}

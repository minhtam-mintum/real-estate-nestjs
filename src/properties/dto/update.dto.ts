/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString } from 'class-validator';

import { CreatePropertyDto } from './create.dto';

export class UpdatePropertyDto extends CreatePropertyDto {
  @IsString()
  propertyId!: string;
}

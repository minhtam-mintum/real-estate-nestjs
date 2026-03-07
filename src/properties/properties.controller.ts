import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create.dto';
import { UpdatePropertyDto } from './dto/update.dto';
import { FilterPropertiesDto } from './dto/filter.dto';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}
  @Post()
  create(@Body() body: CreatePropertyDto) {
    return this.propertiesService.create(body);
  }
  @Get()
  findAll(@Query() query: FilterPropertiesDto) {
    return this.propertiesService.findAll(query);
  }
  @Get(':propertyId')
  getDetail(@Param('propertyId') propertyId: string) {
    return this.propertiesService.findOne(propertyId);
  }
  @Put()
  update(@Body() body: UpdatePropertyDto) {
    return this.propertiesService.update(body);
  }
  @Delete(':propertyId')
  delete(@Param('propertyId') propertyId: string) {
    return this.propertiesService.delete(propertyId);
  }
}
